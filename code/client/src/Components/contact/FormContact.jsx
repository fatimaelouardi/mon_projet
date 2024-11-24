


const FormContact = () => {
    return (
        <form class="contact-form" id="contact-form">
                <div class="coordonnees">
                    <div class="field">
                        <label for="nom">Nom complet</label>
                        <input type="text" id="nom" placeholder="Votre nom complet"/>
                    </div>
                    
                    <div class="field">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Votre email"/>
                    </div>
                    
                    <div class="field">
                        <label for="telephone">Téléphone</label>
                        <input type="tel" id="telephone" placeholder="Votre téléphone"/>
                    </div>
                </div>
                
                <div class="field">
                    <label for="message">Message</label>
                    <textarea id="message" placeholder="Votre message">.</textarea>
                </div>
                
                <button type="submit" class="primary-btn btn">Envoyer</button>
            </form>
    )
}


export default FormContact;