import { Link } from "react-router-dom";

import "../../assets/css/admin/adminHomeMain.css";


const AdminHomePage = () =>{

    return(

        <main className="adminHomeMain">
            <h1>Hello</h1>

<p>
<Link to={"/admin/produit"}>Manage Produit </Link>
</p>
        </main>
    )




     
}

export default AdminHomePage;