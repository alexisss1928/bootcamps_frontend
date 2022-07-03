import React, { useState, useEffect } from 'react'
import Modal from '../components/modalBootcamp'
import Head from 'next/head'
import Link from 'next/link';
import {useRouter} from 'next/router'
import axios from 'axios'
import Bootcamp from '../components/bootcamp';


export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [ search, setSearch ] = useState('');
  const router = useRouter()
  const ImageURL = '${process.env.NEXT_PUBLIC_BASE_URL}'
  const [bootcamps, setBootcamps] = useState([])

  const getBootcamps = async (e) => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bootcamps/?populate=comments,logo`);
      setBootcamps(data.data)
    } catch (error) {
      console.log(error)
    }
  };

  const handleSearch = async (e) => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bootcamps?filters[name][$contains]=${search}&populate=comments,logo`);
      setBootcamps(data.data)
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearch(value);
  };

  useEffect(() => {
    getBootcamps();    
  }, [])


  return (
    <div className="container">
      <Head>
        <title>Bootcamps Hub</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="nav">
        <h1>
          Bootcamps <span>Hub</span>
        </h1>
        <div className='searchBar'>
          <input type="search" name="" id="search" placeholder='Buscar por nombre' onKeyUp={handleSearch} onChange={handleChange}/>
        </div>
        <button className='addBootcampDesktop' onClick={() => router.push('/registerBootcamp')}>
          Registrar Bootcamp
        </button>
        <button className='addBootcampMobile' onClick={() => router.push('/registerBootcamp')}>+</button>
      </nav>
      <main>
        {bootcamps.map((bootcamp) => {
          return(
          <div className='card'>
            <div className='left-side'>
              <div className='logo'>
                <img src={`${process.env.NEXT_PUBLIC_BASE_URL}${bootcamp.attributes.logo.data?.attributes.formats.small.url}`} />
              </div>
              <h3>Estudiantes</h3>
            <p><span>Actuales</span> <br/> {bootcamp.attributes.currentStudents}</p>
            <p><span>Totales</span> <br/> {bootcamp.attributes.globalStudents}</p>
            <p><span>Graduados</span> <br/> {bootcamp.attributes.studentsGraduated}</p>
            <p><span>% de dropout</span> <br/> {bootcamp.attributes.studentsDropout}</p>
            </div>
            <div className='right-side'>
            <div className='logo logoMobile'>
                <img src={`${process.env.NEXT_PUBLIC_BASE_URL}${bootcamp.attributes.logo.data?.attributes.formats.small.url}`} />
              </div>
              <div className='card_title'>
              <h2><a href={`bootcamp/${bootcamp.id}`}>{bootcamp.attributes.name}</a></h2>
              <p>{bootcamp.attributes.countries}</p>
              </div>
            <p><span>Programas disponibles: </span>{bootcamp.attributes.programs}</p>
            <p>Se abre nuevo batch cada {bootcamp.attributes.batchsFrequency} aproximadamente</p>
            <p><span>Costo: </span> {bootcamp.attributes.cost == 0 ? 'Free' : `${bootcamp.attributes.cost}$`}</p>
            <p><span>Formas de pago:</span> {bootcamp.attributes.paidForm}</p>
            <div className='commentsBox'>
              <br/>
              <h3>Comentarios</h3>
              <div className='comment'>
              {bootcamp.attributes?.comments.data.length == 0 ? <p>No hay comentarios</p> : <p><span>{bootcamp.attributes?.comments.data[0]?.attributes.name}: </span>{bootcamp.attributes?.comments.data[0]?.attributes.comment}</p>}
              </div>
            </div>
            {bootcamp.attributes?.comments.data.length == 0 ? null : <a className='moreComment' onClick={() => router.push(`bootcamp/${bootcamp.id}`)}>Ver mas comentarios</a>}
              <div className='buttonCTA'>
              <button href={bootcamp.attributes.registryLink}>Registrate aqui</button>
              </div>
            </div>
            {/* <div>
            <button onClick={() => setShowModal(true)}>Open Modal</button>
            <Modal
                onClose={() => setShowModal(false)}
                show={showModal}
            >
                <Bootcamp bootcamp={bootcamp}/>
            </Modal>
        </div> */}
          </div>
)
        }  
        )}
      </main>

      <style jsx>{`
      .container {
        padding: 20px;
      }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        nav h1 {
          margin: 0;
        }

        nav span {
          background-color: #a0a0cc;
          padding: 5px;
          border-radius: 5px;
          color: #fff;
        }

        button {
          border: none;
          padding: 10px 15px;
          color: #fff;
          background-color: #a0a0cc;
          border-radius: 5px;
          cursor: pointer;
        }

        .buttonCTA button{
          width: 100%;
          margin-top: 10px;
        }

        nav a {
          text-decoration: none;
        }

        #search {
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
        }

        .card {
          border-radius: 10px;
          width: 100%;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 40px;
          display: flex;
          background-color: rgb(255, 255, 255);
          overflow: hidden;
          box-shadow: 5px 5px 50px 20px #cdcdcd6b;
          transition: .2s;
        }

        .card:hover {
          box-shadow: 10px 10px 30px 20px #cdcdcdb3;
          transform: translate(-15px, -15px);
        }

        .card h2 {
          font-size: 2.3rem;
          margin-top: 0;
          margin-bottom: 0;
        }

        .card a {
          text-decoration: underline;
          cursor: pointer;
        }

        .card_title {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
        }

        .card_title p {
          font-weight: 700;
        }

        .card span {
          color: #212121;
          font-weight: 700;
        }

        .logo {
          width: 100px;
          height: 100px;
          margin: 0 auto 20px auto;
        }

        .logo img {
          width: 100%;
        }

        .card > div {
          padding: 40px;
        }

        .card_title a {
          text-decoration: none;
          color: #c4c4c4; 
        }

        .left-side {
          background-color: #a0a0cc29;
          min-width: 250px;
          text-align: center;
        }

        .left-side h3 {
          font-size: 16px;
    color: #b870ef;
        }

        .right-side {
          width: 100%;
        }

        /* .commentsBox {
          padding: 10px 0;
        } */

        .comment {
          padding: 10px;
          background-color: #a0a0cc1f;
          border-radius: 5px;
        }

        .moreComment {
          font-size: 12px;
          color: #a0a0ccdb;
          float: right;
          margin-top: 5px;
        }

        .comment p {
          margin: 0;
        }

        .commentsBox > * {
          margin: 0;
        }

        .commentsBox h3 {
          font-size: 14px;
          color: #b870ef;
        }

        .commentsBox p {
          font-size: 12px;
        }

        .addBootcampMobile {
          display: none;
        }

        @media (min-width: 750px) {
          .logoMobile {
            display: none;
          }
        }

        @media (max-width: 750px) {
          .left-side {
            display: none;
          }

          .card_title {
            gao: 0;
          }
          .searchBar, nav .addBootcampDesktop {
            display: none;
          }

          .addBootcampMobile {
            display: block;
          }

          .card:hover {
            box-shadow: revert;
            transform: unset;;
          }
        }
      `}</style>
    </div>
  );
  
}
