type Produit = {
    id_produit?: number; 
    nom?: string; 
    description?: string; 
    prix?: number; 
    theme?: string; 
    genre?: "homme" | "femme"; 
    image?: string;
};

export default Produit;
