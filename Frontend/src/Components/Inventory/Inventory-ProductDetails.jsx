import { Link } from "react-router-dom";
import formatNumber from 'format-number';

const ProductDetails = ({ Inventory }) => {
    // Define options for formatting
    const options = { round: 2, padRight: 2, padLeft: 0, thousand: ',', decimal: '.' };

    // Format price with comma and two decimal places
    const formattedPrice = formatNumber(options)(parseFloat(Inventory.pricebeforeDiscount));

    // Format discounted price with comma and two decimal places
    const formattedDiscountedPrice = formatNumber(options)(parseFloat(Inventory.price));

    return ( 
        <div className="productDetails">
            <Link to={`http://localhost:5173/selectedItem/${Inventory._id}`}>
                <table>  
                    <tr>
                        <td className="productDetails-image">
                            <img src={`http://localhost:8000/images/${Inventory.img_URL}`} alt="Product"/>
                        </td>
                        <td className="productDetails-name">{Inventory.name}</td>
                        <td className="productDetails-price">{formattedPrice}</td>
                        <td className="productDetails-disPrice">{formattedDiscountedPrice}</td>
                        <td className="productDetails-quantity">{Inventory.quantity}</td>
                    </tr>
                </table>
            </Link>
        </div>
     );
}
 
export default ProductDetails;
