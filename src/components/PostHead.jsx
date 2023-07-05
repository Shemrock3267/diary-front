import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { usePostsContext } from '../hooks/usePostsContext';
import css from '../styles/styles.module.scss';
import { useAuthContext } from '../hooks/useAuthContext';

const PostHead = ({ post }) => {
  const { title, date } = post;
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/posts/${post._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const body = await response.text();
      const json = JSON.parse(body);

      if (response.ok) {
        dispatch({ type: 'DELETE_POST', payload: json });
      }
    } catch (err) {
      console.log(err.message || 'Error: failed to delete post');
    }
  };

  return (
    <li>
      <span className={css.postHeadHeader}>
        <h2>
          <Link to={`/api/posts/${post._id}`}>{title}</Link>
        </h2>

        <span className='material-symbols-outlined' onClick={handleDeletePost}>
          Delete
        </span>
      </span>
      <div>{format(new Date(date), 'MMMM d, y')}</div>
      <p>{post.content.substring(0, 150) + '...'}</p>
    </li>
  );
};

export default PostHead;
