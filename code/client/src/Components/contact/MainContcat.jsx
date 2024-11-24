import AsideContact from "./AsideContcat";
import FormContact from "./FormContact";




const MainContact = () => {
    return (
       <main className="mainContact">
           <h1>A votre écoute</h1>
         <section className="contact-us">
         
            <AsideContact/>
            <FormContact/>

        </section>
       </main>
    )
}



export default MainContact;