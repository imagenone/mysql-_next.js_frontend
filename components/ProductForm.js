import axios from "axios";
import { useEffect, useState } from "react";
// importador de next
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price:0,
  });

// importador de next a traves de un metodo hook
  const router = useRouter()
  const handleChange = ({ target: { name, value } }) =>
    setProduct({ ...product, [name]: value });

  // funcion para guardar product
  const handleSubmit = async (e) => {
    e.preventDefault();
  
try {

  // funcion para editar y guardar product
  if (router.query.id ){
   
  
   await axios.put('/api/asignaturas/' + router.query.id, product,)
   console.log("editando y guardando product")
   toast.error(" error")
   toast.success("asignaturas updated successfully");
   
  }else{
    
  const res = await axios.post('/api/asignaturas/', product);
  toast.success("asignaturas create successfully")
  console.log( "CREANDO PRODUCTO", res);
  
  }

  // ir a la ruta inicial a traves de
  router.push('/')
  
} catch (error) {
  toast.error(error.response.data.message)
}
  };



// funcion para editar product
useEffect(() => {
 
try {

  const getProduct = async () => {
    const {data} = await axios.get('/api/asignaturas/' + router.query.id)
    setProduct(data)
    console.log( "editando id:", data)
  }

if (router.query.id) {
getProduct(router.query.id)

}
} catch (error) {
  toast.error(error.response.data.message)
}
}, []);


  return (
    <div className=" m-4 w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className=" rounded  bg-slate-500 px-8 pt-8 pb-8 mb-4"
      >

      <div className="mb-4" >
          <label className=" block text-gray-700 text-sm font-bold mb-2  " htmlFor="name">
              
              Name
            </label>
            <input
              type="text"

              name="name"
              placeholder="name of product"
              onChange={handleChange}
              className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
              value={product.name}
            />
      </div>
      
<div className="mb-4" >

        <label className=" block text-gray-700 text-sm font-bold mb-2 " htmlFor="price">
          
          Price
        </label>
        <input
          type="text"
          name="price"
          id="price"
          placeholder="only number"
          maxLength={10}
          onChange={handleChange}
          className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
          value={product.price}
        />

        <label className="  block text-gray-700 text-sm font-bold mb-2 " htmlFor="description">
          {" "}
          description
        </label>
        <textarea
          name="description"
          placeholder="write description"
          rows={2}
          onChange={handleChange}
          className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
          value={product.description}
        ></textarea>

</div>


        <button className="  texto border-2 rounded bg-gray-500 hover:bg-blue-700 text-white">
          {
            router.query.id ? 'update Product ' : 'save Product'
          }
        </button>
      </form>
    </div>
  );
}
