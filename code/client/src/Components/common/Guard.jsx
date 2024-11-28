import { useContext, useEffect } from "react";
import { UserContext } from "../../provider/User_provider";
import { useNavigate } from "react-router-dom";



const Guard = ({children, roles}) => {
    // récupérer l'utilisateur 


    const {user, setUser} = useContext(UserContext);

    // navigation
    const navigate = useNavigate();

    // tester le role de l'utilisateur 

    useEffect(() => {
        // indexOf permet de chercher l'indice d'un élément dans un array 
        if(roles.indexOf(user?.id_role) === -1){
            window.sessionStorage.setItem('notice', 'Access denied');

            navigate('/');
            return;
        }
    }, [navigate, roles, user ]);

    return children;
    
    

}


export default Guard;