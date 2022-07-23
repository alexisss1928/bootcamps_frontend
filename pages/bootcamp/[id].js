import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import CommentsBox from '../../components/commentsBox';

export default function Bootcamp({ bootcamp }) {
  const router = useRouter();
  const [filtered, setFiltered] = useState('All')

  const handleFilter = (filterSelected) => {
    setFiltered(filterSelected)
  }

  return (
    <div className="wrapper">
      <button className="backButton" onClick={() => router.push('/')}>
        Regresar
      </button>
      <div className="head">
        <div className="logo">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${bootcamp.data.attributes.logo.data?.attributes.formats.small.url}`}
          />
        </div>
        <div>
          <h1>{bootcamp.data.attributes.name}</h1>
          <p>{bootcamp.data.attributes.countries}</p>
        </div>
      </div>
      <div className="commentsBox">
        <p>
          <span>Programas disponibles: </span>
          {bootcamp.data.attributes.programs}
        </p>
        <p>
          Se abre nuevo batch cada {bootcamp.data.attributes.batchsFrequency}{' '}
          aproximadamente
        </p>
        <p>
          <span>Costo: </span>{' '}
          {bootcamp.data.attributes.cost == 0
            ? 'Free'
            : `${bootcamp.data.attributes.cost}$`}
        </p>
        <p>
          <span>Formas de pago:</span> {bootcamp.data.attributes.paidForm}
        </p>

        <p>
          Quieres registrarte en el bootcamp o deseas mas informacion?, puedes
          hacerlo <a href={bootcamp.data.attributes.registryLink}>aqui</a>
        </p>
        <h3 className="statisticsTitle">Algunas datos</h3>
        <div className="statisticsBox">
          <div>
            <div className="statistic">
              <p>
                <span>Actuales</span> <br />{' '}
                {bootcamp.data.attributes.currentStudents}
              </p>
            </div>
          </div>
          <div>
            <div className="statistic">
              <p>
                <span>Totales</span> <br />
                {bootcamp.data.attributes.globalStudents}
              </p>
            </div>
          </div>
          <div>
            <div className="statistic">
              <p>
                <span>Graduados</span> <br />{' '}
                {bootcamp.data.attributes.studentsGraduated}
              </p>
            </div>
          </div>
          <div>
            <div className="statistic">
              <p>
                <span>% de dropout</span> <br />{' '}
                {bootcamp.data.attributes.studentsDropout}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="commentsBox">
        <h2>Comentarios</h2>
        <div className='commentCalificationFilterBox'>
          <button onClick={() => handleFilter('all')}>All</button>
        <button onClick={() => handleFilter('good')} className='goodCommentButtonFilter'><FontAwesomeIcon className="goodComment" icon={faThumbsUp} /> {bootcamp.data.attributes.comments.data.filter((comment) => comment.attributes.calification  ).length}</button>
        <button onClick={() =>  handleFilter('bad')} className='badCommentButtonFilter'><FontAwesomeIcon className="badComment" icon={faThumbsDown} /> {bootcamp.data.attributes.comments.data.filter((comment) => !comment.attributes.calification  ).length}</button>
        </div>
        {bootcamp.data.attributes.comments.data.filter((comment) => {
          if (filtered === 'good'){
            return comment.attributes.calification
          } else if (filtered === 'bad') {
            return !comment.attributes.calification
          } else {
            return comment.attributes.calification || !comment.attributes.calification
          }
        }).map((item) => {
          return (
            <div className="comment">
              <p>
                <span>
                  {item?.attributes.name === ''
                    ? 'Anonimo'
                    : item?.attributes.name}
                </span>
                : <span className={item.attributes.calification ? 'goodComment' : 'badComment'}>{item.attributes.calification ? <FontAwesomeIcon className="goodComment" icon={faThumbsUp} /> : <FontAwesomeIcon className="badComment" icon={faThumbsDown} />}</span>{' '}
                {item?.attributes.comment}
              </p>
            </div>
          );
        })}
        <br />
        <CommentsBox id={bootcamp.data.id} />
      </div>

      <style jsx>{`
        .wrapper {
          padding: 20px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .head {
          display: flex;
          align-items: center;
        }

        .head h1 {
          margin: 0;
        }

        .head p {
          margin: 0;
          color: #898989;
        }

        .head img {
          width: 100%;
        }

        .logo {
          width: 100px;
          height: 100px;
          margin: 20px;
          border-radius: 50%;
          overflow: hidden;
          object-fit: contain;
        }

        .commentsBox {
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          margin: 15px 0;
        }

        .comment {
          margin-bottom: 25px;
        }

        .statisticsBox {
          display: flex;
          flex-wrap: wrap;
        }

        .statistic {
          background-color: #ebebeb;
          width: 100px;
          height: 100px;
          height: 100px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px auto;
        }

        .statisticsTitle {
          text-align: center;
          margin-top: 40px;
        }

        .statisticsBox > div {
          flex: 1;
          min-width: 100px;
          text-align: center;
        }

        span {
          font-weight: bold;
          color: #212121;
        }

        button {
          border: none;
          padding: 10px 15px;
          color: #fff;
          background-color: #a0a0cc;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #7b7bad;
        }

        .backButton {
          position: fixed;
          top: 20px;
          right: 20px;
        }

        .goodComment {
          color: #92d27b;
        }

        .badComment {
          color: #ff7878;
      }

      .goodCommentButtonFilter {
        background-color: #92d27b;
      }

      .badCommentButtonFilter {
        background-color: #ff7878;
    }

      .commentCalificationFilterBox button {
        margin-right: 10px ;
      }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const data = await fetch(
    `${process.env.BASE_URL}/api/bootcamps/${params.id}?populate=comments,logo`
  );
  const bootcampData = await data.json();
  return {
    props: {
      bootcamp: bootcampData,
    },
  };
}
