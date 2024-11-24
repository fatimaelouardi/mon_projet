import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../Connexion/InputField"; // Import du composant pour les champs d'entrée

const RegisterPage = ({ onToggle, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
      <figure className="logo">
        <img src="images/connexionPage/logo.svg" alt="Logo Montee" />
      </figure>
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

      <InputField
        type="text"
        id="nom"
        label="Nom"
        ariaLabel="Nom pour inscription"
        {...register("nom", { required: "Nom est requis" })}
        error={errors.nom}
      />
      <InputField
        type="email"
        id="email-register"
        label="Email"
        ariaLabel="Email pour inscription"
        {...register("email", { required: "Email est requis" })}
        error={errors.email}
      />
   
      <InputField
        type="password"
        id="password-register"
        label="Mot de passe"
        ariaLabel="Mot de passe pour inscription"
        {...register("mot_de_passe", { required: "Mot de passe est requis" })}
        error={errors.mot_de_passe}
      />
      <InputField
        type="number"
        id="telephone"
        label="Téléphone"
        ariaLabel="Téléphone pour inscription"
        {...register("telephone", { required: "Téléphone est requis" })}
        error={errors.telephone}
      />

      <button type="submit" className="sign-btn">Inscription</button>
    </form>
  );
};

export default RegisterPage;
