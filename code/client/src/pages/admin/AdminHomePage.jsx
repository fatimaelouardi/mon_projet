import { Link } from "react-router-dom";


const AdminHomePage = () =>{

    return(

        <main>
            <h1>Hello</h1>

<p>
<Link to={"/admin/produit"}>Manage Produit </Link>
</p>
        </main>
    )




     
}

export default AdminHomePage;