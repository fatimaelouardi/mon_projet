import { Link } from "react-router-dom/dist";
import '../../assets/css/header.css'
import { useContext } from "react";
import { UserContext } from "../../provider/User_provider";

const Header = () => {

    
    const { user, setUser } = useContext(UserContext);

    
    return (
        <>
        <header>
    <span id="menu-icon">
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <i class="ri-menu-2-line"></i>
    </span>
    <Link to={'/'} class="logo"><img src="/images/white_logo_montee.svg" alt="Logo" />
    </Link>
    
    


    
    <nav id="navbar">
        <ul class="nav-links">
            
            <Link><a href="perso.html">Design Unique</a></Link>

            {
                // condition react : condition ternaire est la seule condition disponible dans le html de react
                // condition ? instruction : else 
                user ? <Link to={ '#'}>Logout</Link> : <> <Link to={'/login'}><a href="produits.html">login</a></Link>
            <Link to={'/contact'}><a href="contact.html">À votre écoute</a></Link></>


            }
           
            <Link ><a href="contact.html"></a>{user?.nom}</Link>
            <Link ><p>{JSON.stringify(user)}</p></Link>
            
        </ul>
    </nav>
    <ul class="header-icons">
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <li><a href="compte.html"><i class="ri-shopping-bag-2-line"></i></a></li>
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <li><a href="panier.html"><i class="ri-user-line"></i></a></li>
    </ul>
    <span id="close-icon">
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <i class="ri-close-line"></i>
    </span>
</header>
        </>
    )
}


export default Header ;