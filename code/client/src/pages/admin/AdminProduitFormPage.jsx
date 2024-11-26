import { Link, useNavigate } from "react-router-dom"; 
import { useForm } from "react-hook-form";
// import { selectAllTaille } from "../../service/taille_api";
import { createProduit } from "../../service/produit_api";
import { useContext, useEffect, useState } from "react";
import { authUser } from "../../service/security_api";
import { UserContext } from "../../provider/User_provider";

const AdminProduitFormPage = () => {
    const {register, handleSubmit, formState: {errors}, } = useForm();

    // useNvigate permet de changer de route (redirection)

    const navigate =  useNavigate();


      // hna les tailles 
    // récupérer les tailles  

    // const [tailles, setTaille] = useState([]);

    // useEffect(() => {
    //     selectAllTaille().then((results) => setTaille(results.data))
    // }, [])
    


    // soumission du formulaire 
    // le paramet data permet de récupérer la saisie du foemulaire 


    // récu l'utilisateur stocké  dans le contexte

    const {user, setUser} = useContext(UserContext);



    const submit = async (data) => {
        console.log(data);


        const authentication = await authUser(user);
        console.log(authentication.data.token);


        // créer un produit 

        const results = await createProduit(authentication.data.token , data);



        

        // enregistrer l'utilisateur 
        // const results = await registerUser(data);

        // // si l'enregistrement a été effectué 

        // if (results.status === 201) {
        //     // srocker le messagedans la session 

        //     window.sessionStorage.setItem('notice', 'Registration success');


        //     // redirection vers une route 
        //     navigate("/");

        // }
        
        
        
    };



    return <>
    
    <main className="container">
        <h2>Create a new product</h2>

        {/* si le formulaire possède un champ file ajouter l'attribut encType = multipart/form-data */}

        <form  className="form" onSubmit={  handleSubmit(submit)} encType="multipart/form-data">
        <p>
                <label htmlFor="nom"  >Nom du produit </label>
                {/* register remplace l'attribut HTML name  */}
                <input type="text" {...register('nom')} id="nom" />
            </p>
            <p>
                <label htmlFor="desc"  >description </label>
                {/* register remplace l'attribut HTML name  */}
                <input type="text" {...register('description')} id="description" />
            </p>

            <p>
                <label htmlFor="file">Image</label>
                <input type="file" {...register('image',{
                    required:' file is required'
                })}  id="file"  />
                <span> { errors?.image?.message }</span>
            </p>

            <p>
                <label htmlFor="prix">Prix </label>
                <input type="number" {...register('prix')}  id="prix" />
            </p>
            <p>
                    <label htmlFor="genre">Genre</label>
                    <select id="genre" {...register('genre', { required: 'Le genre est obligatoire' })}>
                        <option value="" />
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                    </select>
                    {errors.genre && <span>{errors.genre.message}</span>}
                </p>
            <p>
                <label htmlFor="theme">theme</label>
                <input type="text"  id="theme" {...register('theme')} />
            </p>

         

            <p>
                <input type="hidden" value="" {...register("id_produit")} />
                <button type="submit">Create a product</button>
            </p>
            
        </form>

        <p>
            <Link to={"/admin/produit"}>
            Back to produit admin </Link>
        </p>
    </main>
    
    </>

                
};

export default AdminProduitFormPage;






{/* <p>
<label htmlFor="taille">Taille</label>
<select id="taille" {...register('id_taille', { required: 'La taille est obligatoire' })}>
    <option value="">Sélectionner une taille</option>
    {tailles.map((taille) => (
        <option key={taille.id_taille} value={taille.id_taille}>
            {taille.nom} {/* Afficher le nom de la taille */}
//         </option>
//     ))}
// </select>
// {errors.id_taille && <span>{errors.id_taille.message}</span>}
// </p> */}



