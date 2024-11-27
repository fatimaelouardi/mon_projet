import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createProduit } from "../../service/produit_api";
import { useContext, useState } from "react";
import { authUser } from "../../service/security_api";
import { UserContext } from "../../provider/User_provider";
import "../../assets/css/produitForm.css";

const AdminProduitFormPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [imagePreview, setImagePreview] = useState(null); // Pour prévisualiser l'image

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result); // Charger l'image en base64
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
    };

    const submit = async (data) => {
        const authentication = await authUser(user);
        const token = authentication.data.token;

        const results = await createProduit(token, data);
        if (results.status === 201) {
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
                    <label htmlFor="file">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register('image', { required: 'L\'image est obligatoire' })}
                        id="file"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Prévisualisation" />
                            <button type="button" onClick={removeImage} className="remove-image-btn">
                                &times;
                            </button>
                        </div>
                    )}
                    <span>{errors.image?.message}</span>
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
