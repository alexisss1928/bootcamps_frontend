import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'

const commentsBox = (id) => {
  const router = useRouter()
  const [comment, setComment] = useState({
    name: '',
    comment: '',
  });

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
      router.push(`${id.id}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Dejanos tu opinion del bootcamp</h3>
      <form onSubmit={SendComment}>
        <div>
          <label htmlFor="name">
            Tu nombre
            <span>Opcional</span>
          </label>
          <br />
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
          <br />
          <textarea
            type="text"
            rows="7"
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
      <style jsx>{`
        .container {
          padding: 20px;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        label {
          margin: 15px 0;
        }

        input, textarea {
          background-color: #e6e6e6;
          width: 100%;
          height: 45px;
          padding: 10px;
          border: none;
          border-radius: 5px;
          margin-bottom: 15px;
        }
        
        textarea {
          height: unset;
          resize: none;
        }

        button {
          border: none;
          padding: 10px 15px;
          color: #fff;
          background-color: #a0a0cc;
          border-radius: 5px;
          width: 100%;
          margin: 15px 0;
          cursor: pointer;
        }

        button:hover {
          background-color: #7b7bad;
        }
      `}</style>
    </div>
  );
};

export default commentsBox;
