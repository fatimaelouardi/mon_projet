import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../provider/User_provider";
import { useContext, useState } from "react";
import { loginUser } from "../../service/security_api";
import { useForm } from "react-hook-form";



const Login2 = ({onFocusHandler, onBlurHandler, onToggle}) => {

    const {register, handleSubmit, formState: {errors}, } = useForm();
    const [isActive, setIsActive] = useState(false);
    
  const handleFocus = () => {
    setIsActive(true);
    if (onFocusHandler) onFocusHandler();
  };

  const handleBlur = (e) => {
    setIsActive(e.target.value !== "");
    if (onBlurHandler) onBlurHandler(e);
  };

    const navigate =  useNavigate();

    // useContext permet d'accéder aux données 
    // la on acced au donnes de context on utilise use conntexte et on dit quel context la variable 

    const { user, setUser } = useContext(UserContext);
    // console.log(user);
    

    const submit = async (data) => {
        // console.log(data);

        const results = await loginUser(data);

        // console.log(data);
        
        if (results.status === 200) {

            window.sessionStorage.setItem('notice', 'Login success');

            // stocker l'utilisateur dans le contexte 

            setUser(results.user)
            // redirection vers une route 
            navigate("/");

        }
    }

        return  <>
       <form className="sign-in-form" onSubmit={handleSubmit(submit)}>
       <Link to={'/'} className="logo">
       <img src="images/connexionPage/logo.svg" alt="Logo Montee" />
      </Link>
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

      
    <p className="input-box">
        <label htmlFor="email">Email</label>
        <input type="email" {...register('email',{
            required:' Email is required'
        })}  id="email" onFocus={handleFocus}
        onBlur={handleBlur}  className={`input-field ${isActive ? "active" : ""}` } />
        <span> { errors?.email?.message }</span>
    </p>

    <p className="input-box">
        <label htmlFor="password">Mot de passe </label>
        <input type="password" {...register('mot_de_passe')}  id="password" onFocus={handleFocus}
        onBlur={handleBlur}  className={`input-field ${isActive ? "active" : ""}`}/>
    </p>


      <button type="submit" className="sign-btn">Connexion</button>
    </form>
        
        </>
        

}



export default Login2;