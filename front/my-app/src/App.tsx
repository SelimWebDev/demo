import './App.css';
import { useEffect, useState } from 'react';
import CreateForm from './components/CreateForm'
import Product from './components/Product';
import ProductType from './types/ProductType';
import reqFetch from './req/reqFetch';
import useFetch from './hooks';

function App() {
  
  var [products, setProducts] = useState<ProductType[]>([])

  const [isProductDeleted, setIsProductDeleted] = useState<Boolean>(false)

  useEffect(()=>{
    fetch("http://localhost:3001/products")
    .then((res) => res.json())
    .then((res) => setProducts(res))
  },[isProductDeleted])

  return (
    <div className="App">
     <ul>
       {products.map((product) =>
        <Product key={product.id} product={product} deleted={() => setIsProductDeleted(!isProductDeleted)}></Product> 
        )}
     </ul>
     <div className='divForm'>
        <CreateForm></CreateForm>
     </div>
    </div>
  );
}

export default App;
