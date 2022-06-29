import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Head from 'next/head';
import Link from 'next/link';

const registerBootcamp = () => {
  const [bootcamp, setBootcamp] = useState({});
  const [files,setFiles] = useState()

  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('files', files[0])

    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, formData)
    .then((response)=>{
      const imageId = response.data[0].id

      axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bootcamps`,{
        data: {
          ...bootcamp,
          logo: imageId
        }
      }).then((response)=>{
        console.log('Goog')
      }).catch((error)=>{
        axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload/files/${imageId}`)
        })
    }).catch((error)=>{
      console.error('bad')
    })
  }

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
          data: formData
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={uploadImage}>
        <div>
          <label htmlFor="name">
            Nombre del bootcamp
          </label>
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
          <label htmlFor="logo">
            Logo del bootcamp
          </label>
          <input
            type="file"
            name="logo"
            placeholder="Escribe el nombre del bootcamp"
            autoComplete="off"
            onChange={(e)=>setFiles(e.target.files)}
            required
          />
        </div>
        <div>
          <label htmlFor="countries">
            Paises en los que trabaja
          </label>
          <input
            type="text"
            name="countries"
            placeholder="Escribe el nombre del bootcamp"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="batchsFrequency">
            Frecuencia de los batch
          </label>
          <input
            type="text"
            name="batchsFrequency"
            placeholder="Escribe el nombre del bootcamp"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cost">
            Costo del bootcamp
          </label>
          <input
            type="number"
            name="cost"
            placeholder="Escribe el nombre del bootcamp"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="paidForm">
            Forma de pago
          </label>
          <input
            type="text"
            name="paidForm"
            placeholder="Escribe el nombre del bootcamp"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="programs">
            Programas con los que cuenta
          </label>
          <input
            type="text"
            name="programs"
            placeholder="Escribe el nombre del bootcamp"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="registryLink">
            Enlace de registro
          </label>
          <input
            type="text"
            name="registryLink"
            placeholder="Escribe el nombre del bootcamp"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="globalStudents">
            Cuantos estudiantes han pasado por el bootcamp?
          </label>
          <input
            type="number"
            name="globalStudents"
            placeholder="Escribe el nombre del bootcamp"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="currentStudents">
            Cuantos estudiantes tiene actualmente?
          </label>
          <input
            type="number"
            name="currentStudents"
            placeholder="Escribe el nombre del bootcamp"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="studentsGraduated">
            Cuantos estudiantes han terminado el bootcamp?
          </label>
          <input
            type="number"
            name="studentsGraduated"
            placeholder="Escribe el nombre del bootcamp"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="studentsDropout">
            Que porcentaje de dropout tiene el bootcamp?
          </label>
          <input
            type="number"
            name="studentsDropout"
            placeholder="Escribe el nombre del bootcamp"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
      <button>
        <Link href="/">Regresar</Link>
      </button>
    </>
  );
};

export default registerBootcamp;
