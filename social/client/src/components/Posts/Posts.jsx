import React from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimelinePosts } from "../../actions/postAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if (!posts || !posts.length)
    return (
      <div className="d-flex align-items-center justify-content-center">
        No posts
      </div>
    );
  if (id) {
    posts = posts.filter((post) => post.userId === id);
  }

  return (
    <div className="Posts">
      {loading ? (
        <div className="d-flex align-items-center justify-content-center">
          Fetching Posts...
        </div>
      ) : (
        posts.map((post, index) => <Post data={post} key={index} />)
      )}
    </div>
  );
};

export default Posts;
