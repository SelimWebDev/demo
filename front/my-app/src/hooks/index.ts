import { useState, useEffect } from "react";
import ProductType from "../types/ProductType";

function useFetch(url: string, method: string, body?: {title:string, description:string, price:number}){
    const [isLoaded, updateIsLoaded ] = useState(false)
    const [ products, setProducts ] = useState<ProductType[]>([])

    useEffect( () => {

        switch(method){
            case 'GET':
                fetch(url)
                .then((response) => response.json())
                .then((newData) => setProducts(newData))
                .catch((error) => console.log(error))
                .then(() => updateIsLoaded(true))
                break;
            case "DELETE":
                fetch(url, {
                method: "DELETE"
                })
                .then((res) => console.log(res))
                break;

            case "POST":
                fetch(url, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
                })
                .then((res) => console.log(res))
                break;
        }
        
    },[url])

    return { isLoaded, products }
}

export default useFetch