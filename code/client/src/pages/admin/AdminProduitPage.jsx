import { Link } from "react-router-dom";

import "../../assets/css/produitTable.css";
import { useEffect, useState } from "react";
import { selectAllProduit } from "../../service/produit_api";


const AdminProduitPage = () =>{


     const [produit, setProduit] = useState([]);

    useEffect(() => {
        selectAllProduit().then((results) => setProduit(results.data));
    }, [])
    

   return (
    <main>
    <h2>Admin</h2>

    <p>
        <Link to={"admin/produit"}>Manage Produit </Link>
    </p>

    <p>
        <Link to={"/admin/produit/form"}> Add Product
        </Link>
    </p>

    <table className="table">
          <thead>
          <tr>
                <th>nom</th>
                <th>image</th>
                <th>prix</th>
                <th>genre</th>
                <th>theme</th>
                <th>button</th>
                
            </tr>
          </thead>

          <tbody>
            {produit.map( (data) => (
                <tr key={Math.random()}>
                <td>{data.nom}</td>
                <td><img src={` ${import.meta.env.VITE_API_URL}/images/${data.image}`} alt="" /></td>
                <td>{data.prix}</td>
                <td>{data.genre}</td>
                <td>{data.theme}</td>
                <td className="button">
                    <Link className="link"   to={"#"}>Update</Link>
                    <Link className = "link" to={"#"}>Delete</Link>
                </td>
                
            </tr>
            ))}
          </tbody>
    </table>

  


</main>
   )




}

export default AdminProduitPage;



//  si j'ai un  objet {data.brand.name}


// si c un tableau on boucle : <ul>{data.options.map(item => <li key={Math.random()}>{itam.name}<li>)}<ul>

  /* <td className="button"><i class="ri-pencil-fill"></i> 
                      <i class="ri-delete-bin-6-fill"></i>
                </td> */