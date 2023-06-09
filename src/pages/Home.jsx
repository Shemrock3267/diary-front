import { useState, useEffect } from 'react';

import PostHead from '../components/PostHead';
import PostForm from '../components/PostForm';
import css from '../styles/styles.module.scss';

const Home = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/posts');
        const json = await response.json();

        if (response.ok) setPosts(json);
      } catch (err) {
        console.error(err.message || 'There was an error fetching posts');
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      {/* Posts List */}
      <div>
        <h1>Posts</h1>
        <ul className={css.postList}>
          {posts &&
            posts.map(post => <PostHead key={post._id} post={post} />)}
        </ul>
      </div>

      {/* Edit selected Post */}
      <div><PostForm /></div>
    </>
  );
};

export default Home;
