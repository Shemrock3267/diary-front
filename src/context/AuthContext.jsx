import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext(null);

export const authContextReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        user: payload,
      };
    case 'LOGOUT':
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authContextReducer, { user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    user && dispatch({ type: 'LOGIN', payload: user });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
