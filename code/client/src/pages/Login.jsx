// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../service/security_api";
// import { UserContext } from "../provider/User_provider";
// import { useContext } from "react";


// const Login = () => {
//     const {register, handleSubmit, formState: {errors}, } = useForm();

//     const navigate =  useNavigate();

//     // useContext permet d'accéder aux données 
//     // la on acced au donnes de context on utilise use conntexte et on dit quel context la variable 

//     const { user, setUser } = useContext(UserContext);

//     const submit = async (data) => {
//         // console.log(data);

//         const results = await loginUser(data);


//         if (results.status === 200) {

//             window.sessionStorage.setItem('notice', 'Login success');

//             // stocker l'utilisateur dans le contexte 

//             setUser(results.user)
//             // redirection vers une route 
//             navigate("/");

//         }
//     }
        



//     return <>
//     <main>
//     <h2>Register</h2>

// <form  className="form" onSubmit={handleSubmit(submit)}>

//     <p>
//         <label htmlFor="email">Email</label>
//         <input type="email" {...register('email',{
//             required:' Email is required'
//         })}  id="email"  />
//         <span> { errors?.email?.message }</span>
//     </p>

//     <p>
//         <label htmlFor="password">Mot de passe </label>
//         <input type="password" {...register('mot_de_passe')}  id="password" />
//     </p>
  

//     <p>
//         <button type="submit">Register</button>
//     </p>
    
// </form>
// </main>
    
//     </>


// }


// export default Login;