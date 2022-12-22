const postReducer = (
  state = { posts: [], loading: false, error: false, uplaoding: false },
  action
) => {
  let store = localStorage.getItem("store");
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, uploading: true, error: false };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    case "RETREIVING_START":
      return { ...state, loading: true };
    case "RETREIVING_SUCCESS":
      if (store) {
        store = JSON.parse(store);
      }
      store.postReducer = {
        ...state,
        loading: false,
        posts: action.data,
      };
      localStorage.setItem("store", JSON.stringify(store));
      return {
        ...state,
        loading: false,
        posts: action.data,
      };
    case "RETREIVING_FAIL":
      return {
        ...state,
        loading: false,
      };
    case "DELETE_POST":
      const tmp = [...state.posts];
      const index = tmp.findIndex((t) => t._id === action.data.id);
      if (index >= 0) {
        tmp.splice(index, 1);
      }
      if (store) {
        store = JSON.parse(store);
      }
      store.postReducer = {
        ...state,
        posts: tmp,
      };
      localStorage.setItem("store", JSON.stringify(store));
      return {
        ...state,
        posts: tmp,
      };
    default:
      return state;
  }
};

export default postReducer;
