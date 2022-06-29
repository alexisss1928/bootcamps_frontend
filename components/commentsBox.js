import React, { useState, useEffect } from 'react';
import axios from 'axios';

const commentsBox = (id) => {
  const [comment, setComment] = useState({
    name: '',
    comment: '',
  });

  console.log(comment);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const SendComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`,
        {
          data: {
            ...comment,
            bootcamp: id,
          },
        }
      );
      setComment({
        name: '',
        comment: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={SendComment}>
        <div>
          <label htmlFor="name">
            Tu nombre
            <span>Opcional</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Escribe el nombre del bootcamp"
            autoComplete="off"
            onChange={handleChange}
            value={comment.name}
          />
        </div>
        <div>
          <label htmlFor="comment">Comentario</label>
          <textarea
            type="text"
            name="comment"
            placeholder="Escribe tu comentario acerca del bootcamp"
            autoComplete="off"
            onChange={handleChange}
            value={comment.comment}
            required
          />
        </div>
        <button type="submit">Agregar comentario</button>
      </form>
    </div>
  );
};

export default commentsBox;
