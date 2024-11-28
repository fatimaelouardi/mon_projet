import React, { useState } from "react";
import Carousel from "../Components/Connexion/Carousel";
import "../assets/css/connexion.css";
import Login2 from "../Components/Connexion/Login2";
import RegisterPage from "../Components/Connexion/RegisterPage";

import "../assets/css/connexion.css";
const ConnexionPage = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);
//   const navigate = useNavigate(); // Pour la redirection

  const toggleMode = () => {
    setSignUpMode((prevMode) => !prevMode);
  };



  return (
    <main className={`loginMain ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <section className="container">
        <div className="container-center">
          <section className="forms">
            

            {isSignUpMode ? (
              <RegisterPage onToggle={toggleMode}/>
            ) : (
                <Login2 onToggle={toggleMode}/>
            )}
          </section>
          <Carousel />
        </div>
      </section>
    </main>
  );
};

export default ConnexionPage;
