
// récupérer la props data envoyée par le composant parent 

const BestSellerCard = ({data}) => {
    return <>
   <article>
    <p>
        <img src={ `${import.meta.env.VITE_API_URL}/images/${data.image}` } />
    </p>
    <h2>{data.nom}</h2>
    <p>{data.description}</p>
    <span>{data.prix}</span>
    {/* <ul>
        {data.options.map((item) => (
            <li>{item.name}</li>
        )
            
        )}
    </ul> */}

   </article>
   
   </>;

}


export default BestSellerCard;