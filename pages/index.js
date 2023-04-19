import axios from "axios";

import { Layout } from "@/components/Layout";


import { ProductCard } from "@/components/ProductCard";

function Homepage({ products }) {
  // console.log(products);
  return (
    <Layout>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 " >
      {products.map((product) => (
              <ProductCard key={product.id} product={product} />
      ))}


    </div>
     
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { data: products } = await axios.get(
    "http://localhost:3000/api/asignaturas"
  );

  return {
    props: {
      products,
    },
  };
};

export default Homepage;
