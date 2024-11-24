import React, { useState } from "react";
import LoginPage from "../Components/Connexion/LoginPage";
import RegisterPage from "../Components/Connexion/RegisterPage";
import Carousel from "../Components/Connexion/Carousel";
import "../assets/css/connexion.css";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../service/security_api"; // Importer les fonctions pour l'API

const ConnexionPage = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);
  const navigate = useNavigate(); // Pour la redirection

  const toggleMode = () => {
    setSignUpMode((prevMode) => !prevMode);
  };

  // Soumission du formulaire d'inscription
  const submitRegister = async (data) => {
    const result = await registerUser(data);
    if (result.status === 201) {
      window.sessionStorage.setItem('notice', 'Inscription réussie !');
      navigate("/"); // Redirige vers la page d'accueil après inscription
    } else {
      console.error("Erreur lors de l'inscription");
    }
  };

  // Soumission du formulaire de connexion
  const submitLogin = async (data) => {
    const result = await loginUser(data);
    if (result.status === 200) {
      window.sessionStorage.setItem('notice', 'Connexion réussie !');
      navigate("/"); // Redirige vers la page d'accueil après connexion
    } else {
      console.error("Erreur de connexion", result);
    }
  };

  return (
    <main className={`loginMain ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <section className="container">
        <div className="container-center">
          <section className="forms">
            {isSignUpMode ? (
              <RegisterPage onToggle={toggleMode} onSubmit={submitRegister} />
            ) : (
              <LoginPage onToggle={toggleMode} onSubmit={submitLogin} />
            )}
          </section>
          <Carousel />
        </div>
      </section>
    </main>
  );
};

export default ConnexionPage;
