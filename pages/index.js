import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link';
import {useRouter} from 'next/router'
import axios from 'axios'


export default function Home() {
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
        <div>
          <input type="search" name="" id="search" placeholder='Buscar por nombre' onKeyUp={handleSearch} onChange={handleChange}/>
        </div>
        <button onClick={() => router.push('/registerBootcamp')}>
          Registrar Bootcamp
        </button>
      </nav>
      <main>
        {bootcamps.map((bootcamp) => {
          return(
          <div className='card'>
            <div className='left-side'>
              <div className='logo'>
                <img src={`${process.env.NEXT_PUBLIC_BASE_URL}${bootcamp.attributes.logo.data?.attributes.formats.small.url}`} />
              </div>
            <p><span>Estudiantes actuales</span> <br/> {bootcamp.attributes.currentStudents}</p>
            <p><span>Estudiantes totales</span> <br/> {bootcamp.attributes.globalStudents}</p>
            <p><span>Estudiantes graduados</span> <br/> {bootcamp.attributes.studentsGraduated}</p>
            <p><span>% de dropout</span> <br/> {bootcamp.attributes.studentsDropout}</p>
            </div>
            <div className='right-side'>
              <div className='card_title'>
              <h2>{bootcamp.attributes.name}</h2>
              <p>{bootcamp.attributes.countries}</p>
              </div>
            <p><span>Precio (Forma de pago)</span><br/>{bootcamp.attributes.cost} ({bootcamp.attributes.paidForm})</p>
            <p><span>Programas disponibles</span><br/>{bootcamp.attributes.programs}<br/>Se abre nuevo batch cada {bootcamp.attributes.batchsFrequency} aproximadamente</p>
            <a href={bootcamp.attributes.registryLink}>Registrate aqui</a>
            <div className='comments'>
              <h3>Comentarios</h3>
              <p><span>{bootcamp.attributes?.comments.data[0]?.attributes.name}: </span>{bootcamp.attributes?.comments.data[0]?.attributes.comment}</p>
            </div>
              <button onClick={() => router.push(`bootcamp/${bootcamp.id}`)}>Mostrar mas</button>
            </div>
          </div>
)
        }  
        )}
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0px 20px;
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
          border-radius: 15px;
          width: 100%;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 40px;
          display: flex;
          background-color: rgb(255, 255, 255);
          overflow: hidden;
          box-shadow: 5px 5px 50px 20px #cdcdcd6b;
        }

        .card h2 {
          margin-top: 0; 
        }

        .card_title {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .card span {
          color: #212121;
          font-weight: 700;
        }

        .card a {
          text-decoration: none;
          color: #b870ef;
          font-weight: bold;
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

        .left-side {
          background-color: #a0a0cc29;
        }
      `}</style>

      <style jsx global>{`
        
      `}</style>
    </div>
  );
}
