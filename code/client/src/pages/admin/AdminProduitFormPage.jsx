import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createProduit, selectOneProduit, updateProduit } from "../../service/produit_api";
import { useContext, useEffect, useState } from "react";
import { authUser } from "../../service/security_api";
import { UserContext } from "../../provider/User_provider";
import "../../assets/css/admin/produitForm.css";

const AdminProduitFormPage = () => {
    const { register, 
        handleSubmit, 
        formState: { errors }, 
        // reset permet de rénitialiser un formulaire avec des données existatntes 
        reset,
    } = useForm();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);


    //  srocker le véhicule dont l'identifiant est contenu dans la route 

    const [produit, setProduit] = useState([]);

       // récupérer la variable de route
       const  {id} = useParams();
    //    console.log(id);


    useEffect(() => {
        selectOneProduit(id).then((results) => {

            //     stocker les résultats dans un état 
            setProduit(results.data);

            // réinitialiser le formulaire avec les données existantes 

            reset(results.data);
        });
    }, [id, reset])
    
    // setProduit(results.data)


 
    

    const [imagePreview, setImagePreview] = useState(null); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result); 
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
    };

    const submit = async (data) => {
        const authentication = await authUser(user);


        const token = authentication.data.token;

        const results =  id ? await updateProduit(token, data) 
        : await  createProduit(token, data);


        if ([200, 201].indexOf(results.status) >= 0) {

    // stocker le message dans la session 
    window.sessionStorage.setItem("notice", id ?  "Produit Updated"  :  "Produit Created");
    // redirection vers une route
    navigate("/admin/produit");
        
        }
    };

    return (
        <main className="container">
            <h2>Create a New Product</h2>
            <form className="form" onSubmit={handleSubmit(submit)} encType="multipart/form-data">
            
                <p>
                    <label htmlFor="nom">Nom du produit</label>
                    <input type="text" {...register('nom', { required: "Le nom est obligatoire" })} id="nom" />
                    {errors.nom && <span>{errors.nom.message}</span>}
                </p>

                <p>
                    <label htmlFor="desc">Description</label>
                    <textarea {...register('description')} id="desc" />
                </p>

               

                <p>
                    <label htmlFor="prix">Prix</label>
                    <input type="number" {...register('prix', { required: "Le prix est obligatoire" })} id="prix" />
                    {errors.prix && <span>{errors.prix.message}</span>}
                </p>

                <p>
                    <label htmlFor="genre">Genre</label>
                    <select id="genre" {...register('genre', { required: "Le genre est obligatoire" })}>
                        <option value="" />
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                    </select>
                    {errors.genre && <span>{errors.genre.message}</span>}
                </p>

                <p>
                    <label htmlFor="theme">Thème</label>
                    <input type="text" id="theme" {...register('theme')} />
                </p>

                <p>
                    <input type="hidden" value={ id } {...register('id')} />
                </p>

                <p>
                    <button type="submit">Créer un produit</button>
                </p>
            </form>

            <p>
                <Link to={"/admin/produit"}>Back to produit admin</Link>
            </p>
        </main>
    );
};

export default AdminProduitFormPage;
