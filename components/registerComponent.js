import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

const RegisterComponent = () => {
  const router = useRouter();
  const passRef = useRef('');
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  // const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* if (!passwordValidator.test(passRef.current.value)) {
      alert('Weak Password')
    } */

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/local/register`,
        userData
      );
      router.replace('/login');
    } catch (err) {
      alert(err.response.data.error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="container">
      <Head>
        <title>Bootcamps Hub | Registro</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper">
        <div className="logo">
          <h1>
            <a href="/">Bootcamps <span>Hub</span></a>
          </h1>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas magni earum natus dolorum tempora fugiat?</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>
            Username:
            </label>
            <br />
            <input
              type="text"
              name="username"
              onChange={(e) => handleChange(e)}
            />
          <label htmlFor='email'>
            Email:
          </label>
            <br />
            <input type="text" name="email" onChange={(e) => handleChange(e)} />
          <br />
          <label htmlFor='password'>
            Password:
            </label>
            <input
              type="password"
              name="password"
              ref={passRef}
              onChange={(e) => handleChange(e)}
            />
          <button>Sign up</button>
        <p>Ya tienes una cuenta? <a href="/login">Entra aqui</a></p>
        </form>
      </div>
      <style jsx>{`
        .container {
          padding: 20px;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .wrapper {
          width: 100%;
          max-width: 400px;
        }

        span {
          display: block;
          width: fit-content;
          transition: .2s;
        }

        h1:hover span{
          transform: rotate(385deg) scale(1.3);
        }

        .logo a {
          text-decoration: none;
          display: flex;
          justify-content: center; 
        }

        .logo a:active {
          color: #551a8b;
        }

        .logo span {
          background-color: #a0a0cc;
          padding: 5px;
          border-radius: 5px;
          color: #fff;
          position: relative;
    bottom: 5px;
        }

        form p {
          text-align: center;
        }

        label {
          margin: 15px 0;
        }

        input {
          width: 100%;
          height: 45px;
          padding: 10px;
          border: none;
          border-radius: 5px;
          background-color: #e6e6e6;
          margin-bottom: 15px;
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

export default RegisterComponent;
