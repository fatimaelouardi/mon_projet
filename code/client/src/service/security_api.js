// Enregistrer un utilisateur

const registerUser = async (formData) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) 
    });

    const response = await fetch(request);

    const data = await response.json();

    return data;
};

const loginUser = async (formData) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/login`, { 
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) 
    });

    const response = await fetch(request);

    const data = await response.json();

    return data;
};


// Authentification

const authUser = async (user) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/auth`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user) 
    });

    const response = await fetch(request);

    const data = await response.json();

    return data;
};


export { registerUser, loginUser, authUser };
