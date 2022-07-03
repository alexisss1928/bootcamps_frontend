import CommentsBox from './commentsBox';

export default function Bootcamp({ bootcamp }) {
    console.log(bootcamp)
  return (
    <div className="wrapper">
      <div className="head">
        <div className="logo">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${bootcamp.attributes.logo.data?.attributes.formats.small.url}`}
          />
        </div>
        <div>
          <h1>{bootcamp.attributes.name}</h1>
          <p>{bootcamp.attributes.countries}</p>
        </div>
      </div>
      <div className="right-side">
        <h3>Costo del bootcamp</h3>
        <p>{bootcamp.attributes.cost}</p>
        <h3>Formas de pago</h3>
        <p> ({bootcamp.attributes.paidForm})</p>
        <h3>Programas disponibles</h3>
        <p>{bootcamp.attributes.programs}</p>
        <p>
          Se abre nuevo batch cada {bootcamp.attributes.batchsFrequency}{' '}
          aproximadamente
        </p>
      </div>
        <p>Quieres registrarte en el bootcamp?, puedes hacerlo en el siguiente enlace</p>
        <a href={bootcamp.attributes.registryLink}>Registrate aqui</a>
      {/* <div>
        <h3>{bootcamp.attributes.comments.data[0]?.attributes.name}</h3>
        <p>{bootcamp.attributes.comments.data[0]?.attributes.comment}</p>
      </div> */}
      {/* <CommentsBox id={bootcamp.id} /> */}

      <style jsx>{`
        .wrapper {
          width: 100%;
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
