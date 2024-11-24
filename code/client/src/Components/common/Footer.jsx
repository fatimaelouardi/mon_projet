import '../../assets/css/footer.css'


const Footer = () => {
    return (
        <footer class="footer" id="footer">
    <ul class="footer-nav">
        <li class="info">
            <figure><img src="assets/img/logo_dark_mode.svg" alt="Logo Montee" /></figure>
            <p class="info-p">Nous avons des vêtements qui correspondent à votre style et dont vous êtes fier de porter. Pour femmes et hommes.</p>
            <ul class="socialmedis-icons">
                <li><a href="https://www.instagram.com/montee_montee1/?igsh=NHpkOHloNXNxZnl5"><i class="ri-instagram-line" aria-label="Consultez notre compte instagram"></i></a></li>
                <li><a href="https://www.instagram.com/montee_montee1/?igsh=NHpkOHloNXNxZnl5"><i class="ri-pinterest-line" aria-label="Consultez notre compte pinterest"></i></a></li>
                <li><a href="https://www.instagram.com/montee_montee1/?igsh=NHpkOHloNXNxZnl5"><i class="ri-tiktok-fill" aria-label="Consultez notre compte tiktok"></i></a></li>
            </ul>
        </li>
        <li class="liens-rapides">
            <h3>LIENS RAPIDES </h3>
            <ul class="liens">
                {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                <li><a href="#">Design Unique</a></li>
                {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                <li><a href="#">Dévcouvrir</a></li>
                {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                <li><a href="#">A propos</a></li>
                {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                <li><a href="#">A votre écoute</a></li>
            </ul>
        </li>  

        <li class="aide">
            <h3>AIDE </h3>
            <ul class="liens">
                <li><a href="">Design Unique</a></li>
                <li><a href="">Dévcouvrir</a></li>
                <li><a href="">A propos</a></li>
                <li><a href="">A votre écoute</a></li>
            </ul>
        </li>

        <li class="faq">
            <h3>FAQ </h3>
            <ul class="liens">
                <li><a href="">Design Unique</a></li>
                <li><a href="">Dévcouvrir</a></li>
                <li><a href="">A propos</a></li>
                <li><a href="">A votre écoute</a></li>
            </ul>
        </li>
    </ul>

    <div class="copyright">
        <p>Montee © 2024,Tous droits réservés</p>
        <figure><img src="assets/img/footer-img.svg" alt=""/></figure>
    </div>
</footer>
    )
}

export default Footer;