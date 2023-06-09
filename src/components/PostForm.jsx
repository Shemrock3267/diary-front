import { useForm } from 'react-hook-form';

import css from '../styles/styles.module.scss';

const PostForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (data) => {
    const post = {
      title: data.title,
      date: data.date,
      content: data.content,
    };

    try {
      const response = await fetch('http://localhost:4000/api/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const body = await response.text();
      const newPost = JSON.parse(body);

      if (!response.ok) setError('Something went wrong', { type: 400 });

      if (response.ok) {
        reset({ title: '', date: '', content: '' });
        console.log('New post created: ', newPost);
      }
    } catch (err) {
      console.log(err.message || 'Failed to create a post');
    }
  };

  return (
    <>
      <form className={css.postForm} onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <h3>Create a post</h3>
        </div>

        <input
          type="text"
          placeholder="Title"
          {...register('title', { required: 'required field' })}
        />
        <p>{errors.title?.message}</p>

        <input
          type="date"
          {...register('date', { required: 'required field' })}
        />
        <p>{errors.date?.message}</p>

        <textarea
          rows="25"
          className={css.content}
          {...register('content', { required: 'required field' })}
          placeholder="enter diary content"
        />
        <p>{errors.content?.message}</p>

        <button type="submit" value="submit">
          POST
        </button>
      </form>
    </>
  );
};

export default PostForm;
