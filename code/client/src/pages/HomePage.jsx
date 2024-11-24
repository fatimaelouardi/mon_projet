import { useEffect, useState } from "react";
import '../assets/css/home.css'
import { selectAllProduit } from "../service/produit_api";
import BestSellerCard from "../Components/home/BestSellerCard";
import NoticeMessage from "../Components/common/NoticeMessage";
// import MainHome from "../Components/home/MainHome";



const HomePage = () => {
    // hook  useState : permet de râfraichir  visuellemnt un composant 

    const [produit, setProduit] = useState([]);


    
useEffect(() => {
    selectAllProduit().then( results => setProduit(results.data)
        // console.log(results)
    );
},[]);

    return (
//  * map est l'unique boucle disponible dans le HTML DE REACT 
// - accolades permettent de délimiter la partie HTML de la partie JS

        <main>

            <NoticeMessage/>
        hello
        <div className="grid-produit">
        {
    // boucle sur l'etat (useState)

    // props permet de transmettre des données entre un composant parent et un composant enfant  et l'écriture = équivaut à des attributs html 

    produit.map( item => {
        return<>
         <BestSellerCard key={Math.random()}  data={item}/>
         </>
    })
    }
        </div>
    </main>
    )
    
    // <MainHome/>
    
}


export default HomePage;