import { Link, useNavigate } from "react-router-dom/dist";
import '../../assets/css/header.css';
import { useContext, useState } from "react";
import { UserContext } from "../../provider/User_provider";

const Header = () => {
    const { user, setUser } = useContext(UserContext); // Contexte utilisateur
    const [menuOpen, setMenuOpen] = useState(false); // État pour gérer l'ouverture du menu
    const navigate = useNavigate(); // Permet de rediriger l'utilisateur

    const handleLogout = () => {
        setUser(null); // Déconnexion
        setMenuOpen(false); // Fermer le menu
        navigate('/login'); // Rediriger vers la page de connexion
    };

    const handleUserIconClick = () => {
        if (!user) {
            // Si aucun utilisateur n'est connecté, rediriger vers Login
            navigate('/login');
        } else {
            // Sinon, basculer le menu déroulant
            setMenuOpen(!menuOpen);
        }
    };

    return (
        <>
            <header>
                <span id="menu-icon">
                    <i className="ri-menu-2-line"></i>
                </span>
                <Link to="/" className="logo">
                    <img src="/images/white_logo_montee.svg" alt="Logo" />
                </Link>

                <nav id="navbar">
                    <ul className="nav-links">
                        {/* Liens dynamiques pour l'utilisateur/admin */}
                        {user?.id_role === 1 ? (
                            <Link to="/admin">Gérer Produits</Link>
                        ) : (
                            <>
                                <Link to="/discover">Découvrir</Link>
                                <Link to="/create">Créer</Link>
                                <Link to="/contact">À votre écoute</Link>
                            </>
                        )}
                    </ul>
                </nav>

                <ul className="header-icons">
                    <li>
                        <a href="compte.html">
                            <i className="ri-shopping-bag-2-line"></i>
                        </a>
                    </li>
                    <li>
                        {/* Icône utilisateur avec gestion de connexion/déconnexion */}
                        <div className="user-menu">
                            <i
                                className="ri-user-line"
                                onClick={handleUserIconClick} // Gérer le clic sur l'icône User
                                style={{ cursor: "pointer" }}
                            ></i>
                            {user && menuOpen && ( // Affiche le menu déroulant si connecté
                                <div className="dropdown-menu">
                                    <p>{user?.nom}</p>
                                    <Link to="#" onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </li>
                </ul>
                <span id="close-icon">
                    <i className="ri-close-line"></i>
                </span>
            </header>
        </>
    );
};

export default Header;
