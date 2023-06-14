import { createContext, useReducer } from 'react';

export const PostsContext = createContext(null);

export const postsReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_POSTS':
      return {
        posts: payload,
      };
    case 'CREATE_POST':
      return {
        posts: [payload, ...state.posts],
      };
    case 'DELETE_POST':
      return {
        posts: state.posts.filter((post) => post._id !== payload._id),
      };
    default:
      return state;
  }
};

export const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, { posts: null });

  return (
    <PostsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};
