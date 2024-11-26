import { useContext, useEffect } from "react";
import {UserContext} from "../provider/User_provider";
import { useNavigate } from "react-router-dom";



const LogoutPage = () => {

    // Accéder à l'utilisateur stocké dbas le contexte 

    const {user, setUser} = useContext(UserContext);

    // useNaviagte : redirection


    const navigate = useNavigate();


    // ecécuter des instructions à l'affichage du composant 
    useEffect(() => {
    //   supprimer l'utilisateur du contexte 
    setUser(null);

    // redirection
    navigate("/");


    }, [setUser, navigate]);

    return <></>;
    

};


export default LogoutPage;