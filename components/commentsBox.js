import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import {
  faThumbsUp as faThumbsUpReg,
  faThumbsDown as faThumbsDownReg,
} from '@fortawesome/free-regular-svg-icons';

const commentsBox = (id) => {
  const router = useRouter();
  const [like, setLike] = useState('');
  const [comment, setComment] = useState({
    name: '',
    comment: '',
    calification: '',
  });

  const handleChange = (event) => {
    if (event.target.name === 'calification') {
      setLike(event.target.value);
    }

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
            calification: comment.calification === 'bueno' ? true : false,
          },
        }
      );
      setComment({
        name: '',
        comment: '',
      });
      router.push(`${id.id}`);
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
            <span className="optional">Opcional</span>
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
        <div className="calification">
          <label>Como calificarias este bootcamp</label>
          <label for="bueno" className="goodComment labelThumbs">
            <input
              type="radio"
              id="bueno"
              name="calification"
              value="bueno"
              onChange={handleChange}
              required
            />
            {like === 'bueno' ? (
              <FontAwesomeIcon icon={faThumbsUp} />
            ) : (
              <FontAwesomeIcon icon={faThumbsUpReg} />
            )}
          </label>
          <label for="malo" className="badComment labelThumbs">
            <input
              type="radio"
              id="malo"
              name="calification"
              value="malo"
              onChange={handleChange}
              required
            />
            {like === 'malo' ? (
              <FontAwesomeIcon icon={faThumbsDown} />
            ) : (
              <FontAwesomeIcon icon={faThumbsDownReg} />
            )}
          </label>
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

        .optional {
          margin-left: 5px;
          color: #b5b5b5;
          font-size: 12px;
        }

        input,
        textarea {
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

        .calification {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 30px;
          margin-bottom: 15px;
        }

        .calification input {
          width: 0px;
        }

        .calification .labelThumbs {
          font-size: 24px;
          margin: 0;
        }

        .calification input {
          margin: 0;
          height: 0;
        }

        .goodComment {
          color: #92d27b;
        }

        .badComment {
          color: #ff7878;
        }
      `}</style>
    </div>
  );
};

export default commentsBox;
