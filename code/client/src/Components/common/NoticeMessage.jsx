import { useEffect, useState } from "react";

const NoticeMessage = () => {

    const [notice, setNotice] = useState("");

    useEffect(() => {
    //   récuperer la clé notice stockée dans la sessionStorage 

    if(window.sessionStorage.getItem('notice')){

        // récupérer la clé et l'affecter à l'état 
        setNotice(
            window.sessionStorage.getItem('notice')
        );

        // supprimer la clé  notice 

        window.sessionStorage.removeItem('notice')
    }
    }, [])
    


    return <p>{ notice }</p>;
}


export default NoticeMessage;