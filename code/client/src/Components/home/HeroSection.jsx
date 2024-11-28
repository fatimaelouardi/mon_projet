import { Link } from "react-router-dom/dist";


const HeroSection = () => {
    return (
        <section class="hero" id="hero">
            <h1>Trouvez votre style ou inventez-le</h1>
            <article class="hero-content">
                <h2>C'est vous qui décidez !</h2>
                <p>Choisissez un modèle unique ou créez le vôtre en quelques clics. Avec Montee, chaque t-shirt devient une déclaration de style</p>
                <ul class="hero-btns">
                    <li><Link  class="primary-btn btn" aria-label="Commencer la création de mon t-shirt">Créer mon T-shirt</Link></li>
                    <li><Link  class="secondary-btn btn " aria-label="Explorer nos modèles de t-shirts">Découvrir nos T-shirts</Link></li>
                </ul>
            </article>

            <video autoPlay loop muted className="hero-video" aria-label="Vidéo promotionnelle de Montee">
                <source src="public/videos/hero.mp4" type="video/mp4"/>
                <source src="public/videos/hero.webm" type="video/webm"/>
                <source src="public/videos/hero.ogg" type="video/ogg"/>
                Votre navigateur ne prend pas en charge la balise vidéo.
            </video>
        </section>
    )
    
}


export default HeroSection;