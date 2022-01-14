import reqFetch from "../req/reqFetch"
import ProductPropsType from "../types/ProductPropsType"

function Product(props: ProductPropsType){

    function deleteProduct(){
      reqFetch("http://localhost:3001/products/" + props.product.id, "DELETE")
      props.deleted(true)
    }
    
    return (
      <div className="product" key={props.product.id}>
        <div>{props.product.id}</div>
        <div>{props.product.title}</div>
        <div>{props.product.description}</div>
        <div>{props.product.price}</div>
        <button onClick={deleteProduct}>Supprimmer un produit</button>
      </div>
    )
}

export default Product