import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import useFetch from '../hooks';
import reqFetch from '../req/reqFetch';

function CreateForm(){
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState<number>(0)

    function handleChangeForm(event: ChangeEvent<HTMLInputElement>){
        let field = event.target.id
        if (field == "title"){
          setTitle(event.target.value)
        } else if (field == "description"){
          setDescription(event.target.value)
        } else if (field == "price"){
          setPrice(parseInt(event.target.value))
        }
    }

    function createProductReq(){
        reqFetch("http://localhost:3001/products/", "POST", {title, description, price})
        //useFetch("http://localhost:3001/products/", "POST", {title, description, price})
    }

    return(
        <form onSubmit={createProductReq}>
            <span>Créer un produit</span>
            <label htmlFor="title">Titre</label>
            <input id="title" onChange={handleChangeForm}></input>
            <label htmlFor="description">Description</label>
            <input id="description" onChange={handleChangeForm}></input>
            <label htmlFor="price">Prix</label>
            <input id="price" onChange={handleChangeForm}></input>
            <input type="submit" value="Envoyer" />
        </form>
    )
}

export default CreateForm