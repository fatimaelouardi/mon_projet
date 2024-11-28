import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../service/security_api";

const RegisterPage = ({ onFocusHandler, onBlurHandler, onToggle }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [isActive, setIsActive] = useState(false);
  const handleFocus = () => {
    setIsActive(true);
    if (onFocusHandler) onFocusHandler();
  };

  const handleBlur = (e) => {
    setIsActive(e.target.value !== "");
    if (onBlurHandler) onBlurHandler(e);
  };
  

  // useNvigate permet de changer de route (redirection)

  const navigate =  useNavigate();


  // soumission du formulaire 
  // le paramet data permet de récupérer la saisie du foemulaire 
  const submit = async (data) => {
      // console.log(data);

      // enregistrer l'utilisateur 
      const results = await registerUser(data);

      // si l'enregistrement a été effectué 

      if (results.status === 201) {
          // srocker le messagedans la session 

          window.sessionStorage.setItem('notice', 'Registration success');


          // redirection vers une route 
          navigate("/");

      }
    }

  return (
    <form className="sign-up-form" onSubmit={handleSubmit(submit)}>
      <Link to={'/'} className="logo">
       <img src="images/connexionPage/logo.svg" alt="Logo Montee" />
      </Link>
      <section className="heading">
        <h2>Bienvenue!</h2>
        <p>Vous avez déjà un compte ?</p>
        <button
          type="button"
          className="toggle"
          onClick={onToggle}
          aria-label="Toggle to login form"
        >
          Se connecter
        </button>
      </section>

      <p className="input-box">
                <label htmlFor="nom"  >Nom</label>
                {/* register remplace l'attribut HTML name  */}
                <input type="text" {...register('nom')} id="nom" onFocus={handleFocus}
        onBlur={handleBlur}  className={`input-field ${isActive ? "active" : ""}`}/>
            </p>

            <p className="input-box">
                <label htmlFor="email">Email</label>
                <input type="email" {...register('email',{
                    required:' Email is required'
                })}  id="email"  onFocus={handleFocus}
                onBlur={handleBlur}  className={`input-field ${isActive ? "active" : ""}`}/>
                <span> { errors?.email?.message }</span>
            </p>

            <p className="input-box">
                <label htmlFor="password">Mot de passe </label>
                <input type="password" {...register('mot_de_passe')}  id="password"  onFocus={handleFocus}
        onBlur={handleBlur}  className={`input-field ${isActive ? "active" : ""}`}/>
            </p>
            <p className="input-box">
                <label htmlFor="telephone">Telephone</label>
                <input type="number"  id="telephone" {...register('telephone')} onFocus={handleFocus}
        onBlur={handleBlur}  className={`input-field ${isActive ? "active" : ""}`} />
            </p>


      <button type="submit" className="sign-btn">Inscription</button>
    </form>
  );
};

export default RegisterPage;
