// import { useForm } from "react-hook-form";
// import { registerUser } from "../service/security_api";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
    
//     const {register, handleSubmit, formState: {errors}, } = useForm();

//     // useNvigate permet de changer de route (redirection)

//     const navigate =  useNavigate();


//     // soumission du formulaire 
//     // le paramet data permet de récupérer la saisie du foemulaire 
//     const submit = async (data) => {
//         console.log(data);

//         // enregistrer l'utilisateur 
//         const results = await registerUser(data);

//         // si l'enregistrement a été effectué 

//         if (results.status === 201) {
//             // srocker le messagedans la session 

//             window.sessionStorage.setItem('notice', 'Registration success');


//             // redirection vers une route 
//             navigate("/");

//         }
        
        
        
//     };



//     return <>
    
//     <main className="container">
//         <h2>Register</h2>

//         <form  className="form" onSubmit={  handleSubmit(submit)}>
//         <p>
//                 <label htmlFor="nom"  >Nom</label>
//                 {/* register remplace l'attribut HTML name  */}
//                 <input type="text" {...register('nom')} id="nom" />
//             </p>

//             <p>
//                 <label htmlFor="email">Email</label>
//                 <input type="email" {...register('email',{
//                     required:' Email is required'
//                 })}  id="email"  />
//                 <span> { errors?.email?.message }</span>
//             </p>

//             <p>
//                 <label htmlFor="password">Mot de passe </label>
//                 <input type="password" {...register('mot_de_passe')}  id="password" />
//             </p>
//             <p>
//                 <label htmlFor="telephone">Telephone</label>
//                 <input type="number"  id="telephone" {...register('telephone')} />
//             </p>

//             <p>
//                 <button type="submit">Register</button>
//             </p>
            
//         </form>
//     </main>
    
//     </>


// }


// export default Register;