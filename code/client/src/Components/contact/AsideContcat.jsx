


const AsideContact = () => {
    return (

        <aside class="aside">
                <article class="appel">
                    {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                    <h3><i class="ri-phone-line"></i> Appelez-nous</h3>
                    <p>Nous sommes disponibles 24h/24 et 7j/7.</p>
                    <p>Téléphone :  0156897236</p>
                </article>
                <article class="email">
                    {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                    <h3><i class="ri-mail-line"></i> Écrivez-nous</h3>
                    <p>Remplissez notre formulaire et nous vous contacterons dans les 24 heures.</p>
                    <p>Emails: customer@montee.com</p>
                    <p>Emails: support@montee.com</p>
                </article>
            </aside>
    )
    
}

export default AsideContact;