import React, { useState, useEffect, useContext } from 'react';
import withPrivateRoute from '../components/withPrivateRoute';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

const RegisterBootcamp = () => {
  const router = useRouter();
  const [bootcamp, setBootcamp] = useState({});
  const [files, setFiles] = useState();
  const token = window.localStorage.getItem('token');

  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('files', files[0]);

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const imageId = response.data[0].id;

        axios
          .post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/bootcamps`,
            {
              data: {
                ...bootcamp,
                logo: imageId,
              },
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            router.push('/');
          })
          .catch((error) => {
            alert(error.response.data.error.message);
            axios.delete(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload/files/${imageId}`
            );
          });
      })
      .catch((error) => {
        console.error('bad');
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBootcamp({
      ...bootcamp,
      [name]: value,
    });
  };

  const addBootcamp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bootcamps`,
        {
          data: formData,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Bootcamps Hub</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="nav">
        <h1>
          Bootcamps <span>Hub</span>
        </h1>

        <button onClick={() => router.push('/')}>Regresar</button>
      </nav>
      <div className="heroText">
        <p>
          Listen, Morty, I hate to break it to you but what people call love is
          just a chemical reaction that compels animals to breed. Hit the sack,
          Jack! Nobody's killing me until after I catch my wife with another
          man. Nothing to read into there!
        </p>
      </div>
      <form onSubmit={uploadImage}>
        <h3>*Todos los campos son requeridos</h3>
        <div className="formcontainer">
          <div className="leftform">
            <div>
              <label htmlFor="name">Nombre del bootcamp</label>
              <br />
              <input
                type="text"
                name="name"
                placeholder="Escribe el nombre del bootcamp"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="logo">Logo del bootcamp</label>
              <br />
              <input
                type="file"
                name="logo"
                autoComplete="off"
                onChange={(e) => setFiles(e.target.files)}
                required
              />
            </div>
            <div>
              <label htmlFor="countries">Paises en los que trabaja</label>
              <br />
              <input
                type="text"
                name="countries"
                placeholder="Desde que paises puedes aplicar para el bootcamp"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="batchsFrequency">Frecuencia de los batch</label>
              <br />
              <input
                type="text"
                name="batchsFrequency"
                placeholder="Escribe cada cuanto tiempo abren un nuevo periodo de ingresos"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="cost">Costo del bootcamp</label>
              <br />
              <input
                type="number"
                name="cost"
                placeholder="Monto en dolares americanos, si es gratuito escribe el numero 0, "
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="paidForm">Forma de pago</label>
              <br />
              <select name="select">
                <option value="Transfer">Transferencia</option>
                <option value="Cash" selected>
                  Efectivo
                </option>
                <option value="Paypal">Paypal</option>
                <option value="Other">Otras</option>
              </select>
              {/* <input
                type="text"
                name="paidForm"
                placeholder="De que formas el aspirante podra cancelar sus pagos"
                autoComplete="off"
                onChange={handleChange}
                required
              /> */}
            </div>
          </div>
          <div className="rightform">
            <div>
              <label htmlFor="programs">Programas con los que cuenta</label>
              <br />
              <input
                type="text"
                name="programs"
                placeholder="Con que programas, cursos, etc cuenta el bootcamp"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="registryLink">Enlace de registro</label>
              <br />
              <input
                type="text"
                name="registryLink"
                placeholder="Escribe el enlace a la pagina de inscripcion o al sitio web del bootcamp"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="globalStudents">
                Cuantos estudiantes han pasado por el bootcamp?
              </label>
              <br />
              <input
                type="number"
                name="globalStudents"
                placeholder="Escribe el numero de estudiantes que han pasado por el bootcamp"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="currentStudents">
                Cuantos estudiantes tiene actualmente?
              </label>
              <br />
              <input
                type="number"
                name="currentStudents"
                placeholder="Escribe el numero de cuantos estudiantes tiene actualmente"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="studentsGraduated">
                Cuantos estudiantes han terminado el bootcamp?
              </label>
              <br />
              <input
                type="number"
                name="studentsGraduated"
                placeholder="Escribe el numero de estudiantes que terminaron el bootcamp"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="studentsDropout">
                Que porcentaje de dropout tiene el bootcamp?
              </label>
              <br />
              <input
                type="number"
                name="studentsDropout"
                placeholder="Cual es el porcentaje de alumnos que abandonan el bootcamp"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="buttonCTA">
          <button type="submit">Agregar</button>
        </div>
      </form>
      {/* <button>
        <Link href="/">Regresar</Link>
      </button> */}

      <style jsx>{`
        .container {
          padding: 20px;
        }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        nav span {
          background-color: #a0a0cc;
          padding: 5px;
          border-radius: 5px;
          color: #fff;
        }

        .heroText {
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          padding: 50px;
          text-align: center;
          text-align: center;
        }

        .heroText p {
          font-size: 16px;
        }

        button {
          border: none;
          padding: 10px 15px;
          color: #fff;
          background-color: #a0a0cc;
          border-radius: 5px;
        }

        .buttonCTA {
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .buttonCTA button {
          width: 100%;
          margin-top: 30px;
        }

        nav a {
          text-decoration: none;
        }

        nav h1 {
          margin: 0;
        }

        /*  form {
          height: calc(100vh - 100px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        } */

        form h3 {
          text-align: center;
        }

        .formcontainer {
          display: flex;
          justify-content: center;
          flex-flow: row wrap;
        }

        .formcontainer > div {
          flex: 1;
          max-width: 600px;
          min-width: 300px;
        }

        .leftform > div,
        .rightform div {
          margin: 15px;
        }

        input, select {
          width: 100%;
          max-width: 600px;
          height: 45px;
          padding: 10px;
          border: none;
          border-radius: 5px;
          background-color: #e6e6e6;
        }
      `}</style>
    </div>
  );
};

RegisterBootcamp.getInitialProps = async (props) => {
  console.info('##### Congratulations! You are authorized! ######', props);
  return {};
};

export default withPrivateRoute(RegisterBootcamp);
