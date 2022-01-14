import { useState } from "react";
import ProductType from "../types/ProductType"

function reqFetch(url: string, method: string, body?: {title:string, description:string, price:number}): void{

    switch(method){

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
}

export default reqFetch