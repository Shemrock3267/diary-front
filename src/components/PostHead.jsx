import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import css from '../styles/styles.module.scss';

const PostHead = ({ post }) => {
  const { title, date } = post;
  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/posts/${post._id}`,
        {
          method: 'DELETE',
        }
      );

      const body = await response.text();
      const json = JSON.parse(body);
      if (response.ok) console.log('Post deleted', json);
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

        <span className="material-symbols-outlined" onClick={handleDeletePost}>
          Delete
        </span>
      </span>
      <div>{format(new Date(date), 'MMMM d, y')}</div>
      <p>{post.content.substring(0, 150) + '...'}</p>
    </li>
  );
};

export default PostHead;
