import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`post/${id}/like`, { userId: userId });
export const commentPost = (id, userId, comment) =>
  API.put(`post/${id}/comment`, { userId, comment });
export const deletePost = (id, userId) =>
  API.delete(`post/${userId}/delete/${id}`);

export const deleteComment = (id, cId) =>
  API.delete(`post/${id}/comment/${cId}`);

export const editComment = (id, cId, comment) =>
  API.put(`post/${id}/comment/${cId}`, { comment });
