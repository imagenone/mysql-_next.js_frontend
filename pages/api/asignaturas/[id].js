import { pool } from "../../../config/db";

export default async function handler(req, res) {


  switch (req.method)  {
    case 'GET':
      return await getProduct(req, res);
    case 'DELETE':
      return await deleteProduct(req, res);
    case 'PUT':
      return await updateProduct(req, res);

    default:
      break;
  }

 }

// metodo get product
 const getProduct = async (req, res) => {
try {
  const { id } = req.query;
  const [result] = await pool.query("SELECT * FROM product  WHERE id = ?", [id]);
   return res.status(200).json(result[0]);
} catch (error) {
  return res.status(500).json({message: error.message});
  
}
};
// metodo delete product
const deleteProduct = async (req, res) => {
  try {
    const {id} = req.query;
    // throw new Error("not implemented");
  const result = await pool.query(" DELETE  FROM product  WHERE id = ?", [id]);
  console.log( "mostrando", result)
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({message: error.message});
  }

};
  
// metodo editar

const updateProduct = async (req, res) => {
  const {id } = req.query;
  const { name, description, price } =  req.body;
  try {
    await pool.query(
      " UPDATE product SET name = ?, description = ?, price = ?  WHERE id = ?", 
      [name, description, price, id]
      );
    return res.status(204).json();
    } catch (error) {
      return res.status(500).json({message: error.message});
   
      }


};