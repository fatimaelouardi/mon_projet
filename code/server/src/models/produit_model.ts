type Produit = {
    id_produit?: number; // Identifiant unique du produit
    nom?: string; // Nom du produit
    description?: string; // Description détaillée
    prix?: number; // Prix du produit
    theme?: string; // Thème du produit
    genre?: "homme" | "femme"; // Genre associé au produit
    image?: string; // URL de l'image du produit
};

export default Produit;
