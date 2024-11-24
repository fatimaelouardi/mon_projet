// récupération de tous les articles
const selectAllProduit = async () => {
    // configurer la requête http
    const request = new Request(`${import.meta.env.VITE_API_URL}/produit`);

    // récupérer la réponse
    const response = await fetch(request);

    // récupérer les données JSON contenues dans la réponse
    const data = await response.json();

    // retourner les données JSON
    return data;
};

export { selectAllProduit };