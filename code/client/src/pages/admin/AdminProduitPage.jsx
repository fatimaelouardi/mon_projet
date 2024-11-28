import { Link, useNavigate, useParams } from "react-router-dom";

import "../../assets/css/admin/produitTable.css";
import { useContext, useEffect, useState } from "react";
import { deleteProduct, selectAllProduit } from "../../service/produit_api";
import NoticeMessage from "../../Components/common/NoticeMessage";
import { authUser } from "../../service/security_api";
import { UserContext } from "../../provider/User_provider";


const AdminProduitPage = () =>{

    const navigate = useNavigate();
    const { user } = useContext(UserContext);


     const [produit, setProduit] = useState([]);

    const {id} = useParams();
    useEffect(() => {
        selectAllProduit().then((results) => setProduit(results.data));


        // si lla variable de route existe, supprimer un produit 

        if(id) {remove(id);}
        
        


    }, [id]);


    const remove = async(id) => {
        const authentication = await authUser(user);
        const token = authentication.data.token;
        const results =   await deleteProduct(token, id) ;

        if(results.status === 200) {
            window.sessionStorage.setItem("notice",  "Produit deleted");
            // redirection vers une route
            navigate("/admin/produit");
            return;
        }
    }
    

   return (

    <main className="adminProduitMain">
        
    <h2>Admin</h2>
    <NoticeMessage/>

    <p>
        <Link to={"admin/produit"} className="link">Manage Produit </Link>
    </p>

    

    <h1> Tous Les produits</h1>

    <p className="addProduct">
        <Link to={"/admin/produit/form"} className="link"> Ajouter un produit
        </Link>
    </p>

    <table className="table">
          <thead>
          <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>Genre</th>
                <th>Theme</th>
                <th/>
                
            </tr>
          </thead>

          <tbody>
            {produit.map( (data) => (
                <tr key={Math.random()}>
                <td><img src={` ${import.meta.env.VITE_API_URL}/images/${data.image}`} alt="" /></td>
                <td>{data.nom}</td>
                <td>{data.prix} <span> € </span></td>
                <td>{data.genre}</td>
                <td>{data.theme}</td>
                <td className="button">
                    <Link className="link"   to={`/admin/produit/form/${data.id_produit}`}>Modifier <i class="ri-pencil-fill"/></Link>
                    <Link className = "link" to={`/admin/produit/${data.id_produit}`}> Supprimer<i class="ri-delete-bin-6-fill"/></Link>
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