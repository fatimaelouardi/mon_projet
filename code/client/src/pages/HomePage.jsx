import { useEffect, useState } from "react";
import '../assets/css/home.css'
import { selectAllProduit } from "../service/produit_api";
import NoticeMessage from "../Components/common/NoticeMessage";
import HeroSection from "../Components/home/HeroSection";
import ProduitSection from "../Components/home/ProduitSection";
import PersoSection from "../Components/home/PersoSections";
import OffreSection from "../Components/home/OffreSection";
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
            <HeroSection  />
            <OffreSection/>
            <ProduitSection produit={produit} />
            <PersoSection />
    </main>
    )
    
    // <MainHome/>
    
}


export default HomePage;