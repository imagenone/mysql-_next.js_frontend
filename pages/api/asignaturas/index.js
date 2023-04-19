import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getAsignaturas(req, res);
    case "POST":
      return await saveAsignatura(req, res);
  }
}
// metodo get asignaturas
const getAsignaturas = async (req, res) => {
try {
  const [result] = await pool.query("SELECT * FROM product");
  console.log(result);
  return res.status(200).json(result);

} catch (error) {
  return res.status(500).json({ error});
  
}
};


// metodo insert asignaturas
const saveAsignatura = async (req, res) => {
 
 try {
  const { name, description, price } = req.body;

  const [result] = await pool.query("INSERT INTO  product SET ?", {
    name,
    description,
    price,
  });
return res.status(200).json(name, description, price, result.insertId);

 } catch (error) {
  return res.status(500).json({message: error.message});
  
 }
};
