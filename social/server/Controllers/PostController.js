import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

//Create new Post

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editComment = async (req, res) => {
  const { id, cId } = req.params;
  const { comment } = req.body;
  try {
    await PostModel.updateOne(
      { _id: id, "comments._id": cId },
      {
        $set: {
          "comments.$.comment": comment,
        },
      }
    );
    res.status(200).json("Comment Updated");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteComment = async (req, res) => {
  const { id, cId } = req.params;
  try {
    await PostModel.updateOne(
      { _id: id },
      {
        $pull: {
          comments: { _id: cId },
        },
      }
    );
    res.status(200).json("Comment Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get a post
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action Forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete a post
export const deletePost = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post Deleted successfully");
    } else {
      res.status(403).json("Action Forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const commentPost = async (req, res) => {
  const id = req.params.id;
  const { userId, comment } = req.body;
  try {
    const post = await PostModel.findById(id);
    await post.updateOne({ $push: { comments: { userId, comment } } });
    res.status(200).json("Successfully commented on post");
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get a Timeline Posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    // const currentUserPosts = await PostModel.find({ userId: userId });
    const currentUserPosts = await PostModel.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $set: {
          comments: {
            $map: {
              input: "$comments",
              in: {
                userId: { $toObjectId: "$$this.userId" },
                comment: "$$this.comment",
                _id: "$$this._id",
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.userId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                firstname: 1,
                _id: 1,
                lastname: 1,
                profilePicture: 1,
              },
            },
          ],
          as: "users",
        },
      },
      {
        $set: {
          comments: {
            $map: {
              input: "$comments",
              as: "com",
              in: {
                $let: {
                  vars: {
                    mixed: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$users",
                            as: "user",
                            cond: {
                              $eq: [
                                "$$user._id",
                                { $toObjectId: "$$com.userId" },
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: {
                    $mergeObjects: [
                      "$$com",
                      {
                        firstname: "$$mixed.firstname",
                        lastname: "$$mixed.lastname",
                        profilePicture: "$$mixed.profilePicture",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    ]);

    const followingPosts = await UserModel.aggregate([
      {
        $lookup: {
          from: "users",
          pipeline: [
            {
              $match: {
                username: {
                  $ne: null,
                },
              },
            },
          ],
          as: "users",
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          _id: 0,
          followingPosts: {
            $map: {
              input: "$followingPosts",
              as: "fp",
              in: {
                $mergeObjects: [
                  "$$fp",
                  {
                    comments: {
                      $map: {
                        input: "$$fp.comments",
                        as: "comment",
                        in: {
                          $let: {
                            vars: {
                              mixed: {
                                $arrayElemAt: [
                                  {
                                    $filter: {
                                      input: "$users",
                                      as: "user",
                                      cond: {
                                        $eq: [
                                          "$$user._id",
                                          { $toObjectId: "$$comment.userId" },
                                        ],
                                      },
                                    },
                                  },
                                  0,
                                ],
                              },
                            },
                            in: {
                              $mergeObjects: [
                                "$$comment",
                                {
                                  firstname: "$$mixed.firstname",
                                  lastname: "$$mixed.lastname",
                                  profilePicture: "$$mixed.profilePicture",
                                },
                              ],
                            },
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// db.books.updateOne(
//   { ISBN: "student#id" },
//   {
//     $set: { Title: null },
//   }
// );

// CREATE OR REPLACE PROCEDURE updatePrice (
//   price NUMBER,
// )
//  AS
//    BEGIN
//    price = price + price / 10;
//    print price;
//    END;

//    {_id: 2, Contact: {fname: "Jane", lname: "Smith", email: "jsmith@dom.com"}, balance: 720.0}

//    CREATE OR REPLACE PROCEDURE categories ()
//    AS
//    BEGIN
//    SELECT @COUNT = COUNT(*), @CATEGORY = category FROM PRODUCTS GROUP BY category;
//    print 'There are ' + @COUNT + " categories associated to products";
//    END;

//    CREATE OR REPLACE PROCEDURE compare (
//   productID1 INT,
//   productID2 INT,
//   product1price NUMBER,
//   product2price NUMBER,
//   result INT
// )
//  AS
//    BEGIN
//    IF ISNULL(productID1) OR ISNULL(productID2) OR ISNULL(product1price) OR ISNULL(product2price)
//    BEGIN
//    result = -1
//    END
//    ELSE
//    BEGIN
//    IF product1price = product2price
//    BEGIN
//    result = 1
//    END
//    ELSE
//    IF product1price > product2price
//    BEGIN
//    result = productID1
//    END
//    ELSE
//    BEGIN
//    result = productID2
//    END
//    END
//    RETURN result
//    END;

//    db.books.insertMany([{ISBN:"studentID",Title: '1', Author: 'name'}, {ISBN:"studentID",Title: '2', Author: 'name'}, {ISBN:"studentID",Title: '3', Author: 'name'}])
// db.books.updateOne(
//   { ISBN: "student#id" },
//   {
//     $set: { CourseName: "Advanced Database Systems" },
//   }
// );
