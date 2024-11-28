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

// créer un produit 
const createProduit = async (token, formType) => {




 
    // configurer la requête http



    /*
     2cas : -formulaire sans image : 
                utiliser l'en-tête content-type : application/json  , 
                utiliser JSON.STRINGify sur les données du formulaire 
            - formulaire avce fichier (ex: image video)
                ne pas utiliser content-Type : application/json
                ne pas utiliser JSON.stringify dans body
                avec body, créer un objet formData avec chaque champ du formulaire 

    */

    //  qui a un fichier 
    //  stocke la saisie dans un objet formdata
    const formData = new FormData(); 

    formData.set('id_produit', formType.id_produit);
    formData.set('nom', formType.nom);
    formData.set('description', formType.description);
    formData.set('prix', formType.prix);
    formData.set('theme', formType.theme);
    formData.set('genre', formType.genre);
    formData.set('image', formType.image[0]);
    
    const request = new Request(`${import.meta.env.VITE_API_URL}/produit`, {
      
        
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
            // 'content-Type': 'application/json
        },

        // body : JSON;stringify(formType), // si le formulaire ne possède pas de fichier 
        body: formData
    });
    // console.log(request);

    // récupérer la réponse
    const response = await fetch(request);

    // récupérer les données JSON contenues dans la réponse
    const data = await response.json();

    // retourner les données JSON
    return data;
};


// récupération de tous les articles
const selectOneProduit = async (id) => {
    // configurer la requête http
    const request = new Request(`${import.meta.env.VITE_API_URL}/produit/${id}`);

    // récupérer la réponse
    const response = await fetch(request);

    // récupérer les données JSON contenues dans la réponse
    const data = await response.json();

    // retourner les données JSON
    return data;
};


// Modifier & mise à jour  un produit 
const updateProduit = async (token, formType) => {
 
    // configurer la requête http

    //  qui a un fichier 
    //  stocke la saisie dans un objet formdata
    const formData = new FormData(); 

    formData.set('id_produit', formType.id_produit);
    formData.set('nom', formType.nom);
    formData.set('description', formType.description);
    formData.set('prix', formType.prix);
    formData.set('theme', formType.theme);
    formData.set('genre', formType.genre);
    formData.set('image', formType.image[0]);
    
    const request = new Request(`${import.meta.env.VITE_API_URL}/produit/${formType.id_produit}`, {
      
        
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
            // 'content-Type': 'application/json
        },

        // body : JSON;stringify(formType), // si le formulaire ne possède pas de fichier 
        body: formData
    });
    // console.log(request);

    // récupérer la réponse
    const response = await fetch(request);

    // récupérer les données JSON contenues dans la réponse
    const data = await response.json();

    // retourner les données JSON
    return data;
};


// créer un produit 
const deleteProduct = async (token, id_produit) => {
    
    const request = new Request(`${import.meta.env.VITE_API_URL}/produit/${id_produit}`, {
      
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({id_produit: id_produit})
    });

    // récupérer la réponse
    const response = await fetch(request);

    // récupérer les données JSON contenues dans la réponse
    const data = await response.json();

    // retourner les données JSON
    return data;
};










export { selectAllProduit , createProduit, selectOneProduit, updateProduit, deleteProduct};