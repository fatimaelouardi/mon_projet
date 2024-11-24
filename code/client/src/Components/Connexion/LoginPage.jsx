import React from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField"; // Import du composant personnalisé pour les champs

const LoginPage = ({ onToggle, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
      <figure className="logo">
        <img src="images/connexionPage/logo.svg" alt="Logo Montee" />
      </figure>
      <section className="heading">
        <h2>Bon retour</h2>
        <h6>Pas encore inscrit ?</h6>
        <button
          type="button"
          className="toggle"
          onClick={onToggle}
          aria-label="Toggle to register form"
        >
          Inscris-toi
        </button>
      </section>

      <InputField
        type="email"
        id="email-login"
        label="Email"
        ariaLabel="Email pour connexion"
        {...register("email", { required: "Email est requis" })}
        error={errors.email}
      />
      <InputField
        type="password"
        id="password-login"
        label="Mot de passe"
        ariaLabel="Mot de passe pour connexion"
        {...register("mot_de_passe", { required: "Mot de passe est requis" })}
        error={errors.mot_de_passe}
      />

      <button type="submit" className="sign-btn">Connexion</button>
    </form>
  );
};

export default LoginPage;
