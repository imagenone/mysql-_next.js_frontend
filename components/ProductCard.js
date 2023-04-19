import  Link  from "next/link";



export function ProductCard({product}) {
  return (
    <div>
         <Link href={`/asignaturas/${product.id}`} key={product.id}>
          
            
          <div
            key={product.id}
            className=" border border-gray-200  p-6 shadow-md "
          >
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        
      
        
      
    </Link>
    </div>
  )
}


