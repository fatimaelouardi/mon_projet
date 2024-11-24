

import { createContext, useState } from "react";

// créer le contexte qui permet de stocker des données 
const UserContext = createContext();


// créer un provider , composant qui fournit les données stockées dans le contexte 

// children permet d'indiquer que le composant accepte des composants enfants

const UserProvider = ({ children }) => {

    // état permet de stocker les données de l'utimlisateur connecté 
    // valeur null indique qu'aucun utilisateur n'est connecté 

    const [user, setUser] = useState(null);


    return <UserContext.Provider value={{user, setUser}}>
        { children }
        
    </UserContext.Provider>


}


export { UserContext, UserProvider };