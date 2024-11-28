
// récupérer la props data envoyée par le composant parent 

const   ProductCard = ({data}) => {
    return <>

            <li class="card">
            <figure class="col-img">
               <img src={`${import.meta.env.VITE_API_URL}/images/${data.image}`} alt="" /> 
            </figure>
            <ul class="col-icon">
                <li><a href="h"><i class="ri-heart-line" /></a></li>
                <li><a href="h"><i class="ri-shopping-bag-2-line" /></a></li>
            </ul>
        </li>
   
   </>;

}


export default ProductCard;