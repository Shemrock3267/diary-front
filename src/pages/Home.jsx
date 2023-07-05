import { useEffect } from 'react';

import PostHead from '../components/PostHead';
import PostForm from '../components/PostForm';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import css from '../styles/styles.module.scss';

const Home = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/posts', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) dispatch({ type: 'SET_POSTS', payload: json });
      } catch (err) {
        console.error(err.message || 'There was an error fetching posts');
      }
    };
    user && fetchPosts();
  }, [dispatch, user]);

  return (
    <>
      {/* Posts List */}
      <div>
        <h1>Posts</h1>
        <ul className={css.postList}>
          {posts &&
            posts.map((post) => <PostHead key={post._id} post={post} />)}
        </ul>
      </div>

      {/* Edit selected Post */}
      <div>
        <PostForm />
      </div>
    </>
  );
};

export default Home;
