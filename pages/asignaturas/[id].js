import axios from "axios";
import { Layout } from "../../components/Layout";
import { useRouter  } from 'next/router';
import { toast } from "react-toastify";


function ProductPage({ product }) {
    console.log( "delete id:" , product);
const router = useRouter()



  const handleDelete = async (id) => {
  try {
    console.log("se esta accionado  el boton con el id nro:", id)
    await axios.delete('/api/asignaturas/' + id);
 console.log("id que se va a borrar", id)
   router.push('/')
  } catch (error) {
toast.error(error.response.data.message);
    
  }
  
  };

  return (
    <Layout>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button
        className=" bg-red-500 hover:bg-red-800 rounded text-white px-5 py-2"
        onClick={() => handleDelete(product.id)}
      >
        DELETE
      </button>
      <button
        className=" bg-gray-500 hover:bg-gray-800 rounded ml-2 text-white px-7 py-2"
        onClick={() => router.push('/asignaturas/edit/' + product.id) }
      >
        EDIT
      </button>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { data: product } = await axios.get(
    "http://localhost:3000/api/asignaturas/" + context.query.id
  );

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
