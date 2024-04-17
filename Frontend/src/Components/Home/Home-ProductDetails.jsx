import { Link } from "react-router-dom";
import homeCss from "./home.module.css";
import formatNumber from 'format-number';

const HomeProductDetails = ({Inventory}) => {
    // Define options for formatting
    const options = { round: 2, padRight: 2, padLeft: 0, thousand: ',', decimal: '.' };

    // Format price with comma and two decimal places
    const formattedPrice = formatNumber(options)(parseFloat(Inventory.price));
    return ( 
        <div className={homeCss.homeProductDetails}>
            <Link to={ `http://localhost:5173/cusOrderSelectedItem/${Inventory._id}`}>
                <div className={homeCss.productPicture}><img src={`http://localhost:8000/images/`+Inventory.img_URL} alt="Product" /></div>
                <br></br>
                <div><strong>{Inventory.name}</strong></div>
                <div>Rs {formattedPrice}</div>
            </Link>
        </div>
     );
}
 
export default HomeProductDetails;