import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { useAuthContext } from '../hooks/useAuthContext';
import css from '../styles/styles.module.scss';

const DiaryPost = () => {
  const [post, setPost] = useState(null);

  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) setPost(json);
      } catch (err) {
        console.error(err.message || 'There was an error fetching posts');
      }
    };
    user && fetchPost();
  }, [id, user]);

  if (!post) return null;

  return (
    <div className={css.diaryPost}>
      <h2>{post.title}</h2>
      <div>{format(new Date(post.date), 'MMMM d, y')}</div>
      <p>{post.content}</p>
    </div>
  );
};

export default DiaryPost;
