import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectOneProduit } from "../service/produit_api";

const ProductDetailPage = () => {
    const { id } = useParams(); 
    const [produit, setProduit] = useState(null);

    useEffect(() => {
        selectOneProduit(id).then((data) => setProduit(data));
    }, [id]);

    if (!produit) return <p>Chargement...</p>;

    return (
        <div className="produitzena">
            <h1>{produit.nom}</h1>
            <img 
    src={produit.image ? `${import.meta.env.VITE_API_URL}/images/${produit.image}` : "/images/white_logo_montee.svg"}
    alt={produit.nom || "Produit"}
/>
            <p>{produit.description}</p>
            <p>Prix : {produit.prix}€</p>
            <p>Thème : {produit.theme}</p>
            <p>Genre : {produit.genre}</p>
        </div>
    );
};

export default ProductDetailPage;
