import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/header.css";
import { UserContext } from "../../provider/User_provider";

const Header = () => {
    const { user, setUser } = useContext(UserContext); 
    const [menuOpen, setMenuOpen] = useState(false); 
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
    const navigate = useNavigate(); 
    const handleLogout = () => {
        setUser(null); 
        setMenuOpen(false); 
        navigate("/login"); 
    };

    const handleUserIconClick = () => {
        if (!user) {
            navigate("/login");
        } else {
            setMenuOpen((prev) => !prev); 
        }
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev); 
        document.body.classList.toggle("menu-active", !mobileMenuOpen); 
    };

    return (
        <header>
            {/* Menu mobile - icône ouvrir */}
            <span id="menu-icon" onClick={toggleMobileMenu}>
                <i className="ri-menu-2-line" />
            </span>

            {/* Logo */}
            <Link to="/" className="logo">
                <img src="/images/white_logo_montee.svg" alt="Logo" />
            </Link>

            {/* Navbar principale */}
            <nav id="navbar" className={mobileMenuOpen ? "open" : ""}>
                <ul className="nav-links">
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
                        <i className="ri-shopping-bag-2-line" />
                    </a>
                </li>
                <li>
                    <div className="user-menu">
                        <i
                            className="ri-user-line"
                            onClick={handleUserIconClick}
                            style={{ cursor: "pointer" }}
                        />
                        {user && menuOpen && (
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

            {mobileMenuOpen && (
                <span id="close-icon" onClick={toggleMobileMenu}>
                    <i className="ri-close-line" />
                </span>
            )}
        </header>
    );
};

export default Header;



{/* <i
className="ri-user-line"
onClick={handleUserIconClick}
style={{ cursor: "pointer" }}
/> */}