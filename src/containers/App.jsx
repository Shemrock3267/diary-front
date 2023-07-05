import { useRoutes, Navigate } from 'react-router-dom';

import Layout from '../pages/Layout';
import Home from '../pages/Home';
import DiaryPost from '../pages/DiaryPost';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { useAuthContext } from '../hooks/useAuthContext';

const App = () => {
  const { user } = useAuthContext();

  const elements = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: user ? <Home /> : <Navigate to='/api/login' /> },
        {
          path: '/api/posts/:id',
          element: user ? <DiaryPost /> : <Navigate to='/api/login' />,
        },
        {
          path: '/api/login',
          element: !user ? <Login /> : <Navigate to='/' />,
        },
        {
          path: '/api/signup',
          element: !user ? <Signup /> : <Navigate to='/' />,
        },
      ],
    },
  ]);

  return elements;
};

export default App;
