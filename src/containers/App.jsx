import { useRoutes } from 'react-router-dom';

import Layout from '../pages/Layout';
import Home from '../pages/Home';
import DiaryPost from '../pages/DiaryPost';

const App = () => {
  const elements = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {path: '/', element: <Home />},
        { path: '/api/posts/:id', element: <DiaryPost /> },
      ]
    },
  ]);

  return elements;
};

export default App;
