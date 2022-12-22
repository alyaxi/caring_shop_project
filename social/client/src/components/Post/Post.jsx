import React, { useState } from "react";
import "./Post.css";
import { useDispatch } from "react-redux";
import commentIcon from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useSelector } from "react-redux";
import {
  commentPost,
  likePost,
  deletePost,
  deleteComment,
  editComment,
} from "../../api/PostRequest";
import { Link } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import { deleteCachedPost } from "../../actions/postAction";
import Comment from "./Comment";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const Post = ({ data }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(data.comments || []);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const onDelete = () => {
    dispatch(deleteCachedPost(data._id));
    deletePost(data._id, user._id);
  };

  const onCommentDelete = (cId) => {
    const tmp = [...comments];
    const index = tmp.findIndex((c) => c._id === cId);
    if (index >= 0) {
      tmp.splice(index, 1);
    }
    setComments(tmp);
    deleteComment(data._id, cId);
  };

  const onCommentEdit = (cId, com) => {
    const tmp = [...comments];
    const index = tmp.findIndex((c) => c._id === cId);
    if (index >= 0) {
      tmp[index].comment = com;
    }
    setComments(tmp);
    editComment(data._id, cId, com);
  };

  const onComment = () => {
    setComments([
      ...comments,
      {
        userId: user._id,
        comment,
        firstname: user.firstname,
        lastname: user.lastname,
        profilePicture: user.profilePicture,
      },
    ]);
    commentPost(data._id, user._id, comment);
    setComment("");
  };

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="Post">
      <div className="d-flex align-items-center justify-content-between">
        <div className="card-pic">
          <img
            src={
              user.coverPicture
                ? serverPublic + data.profile
                : serverPublic + "defaultProfile.jpg"
            }
            alt=""
          />
          <span>{data.name}</span>
        </div>
        {data.userId === user._id && (
          <Menu
            menuButton={
              <div className="isClickable" style={{ padding: "0px 10px" }}>
                <i className="fas fa-ellipsis-h"></i>
              </div>
            }
            direction="left"
            transition
          >
            <MenuItem className="font-red" onClick={onDelete}>
              <i
                className="fas fa-trash-alt fa-sm"
                style={{ marginRight: 10 }}
              ></i>
              Delete
            </MenuItem>
          </Menu>
        )}
      </div>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
      <span> {data.desc}</span>
      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <Link to="../chat">
          <img src={commentIcon} alt="comment" />
        </Link>
        <img src={Share} alt="share" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        {comments.length > 0 && (
          <div
            className="border-top-1-grey border-bottom-1-grey"
            style={{ maxHeight: 250, overflow: "scroll" }}
          >
            {comments.map((c) => (
              <Comment
                key={c._id}
                user={user}
                onEdit={(com) => onCommentEdit(c._id, com)}
                onDelete={() => onCommentDelete(c._id)}
                {...c}
              />
            ))}
          </div>
        )}
      </div>
      {/* add Comment */}
      <div className="add-comment">
        <span className="material-symbols-outlined">mood</span>
        <InputEmoji
          placeholder="Add a comment"
          value={comment}
          onChange={setComment}
          height={25}
          // onEnter={handleSend}
        />
        <button className="comment" onClick={onComment}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
