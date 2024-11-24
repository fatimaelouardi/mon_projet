// Enregistrer un utilisateur
// formData c la saisie 
const registerUser = async (formData) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/register`, { // Suppression de l'espace à la fin de l'URL
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) // Remplacement du point-virgule par une virgule
    });

    const response = await fetch(request);

    const data = await response.json();

    return data;
};

const loginUser = async (formData) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/login`, { // Suppression de l'espace à la fin de l'URL
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) // Remplacement du point-virgule par une virgule
    });

    const response = await fetch(request);

    const data = await response.json();

    return data;
};


export { registerUser, loginUser };
