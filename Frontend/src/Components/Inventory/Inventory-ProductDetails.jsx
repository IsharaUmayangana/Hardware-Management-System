import { Link } from "react-router-dom";

const ProductDetails = ({Inventory}) => {
    return ( 
        <div className="productDetails">
            <Link to={ `http://localhost:5173/selectedItem/${Inventory._id}`}>
            <table>
                <td className="productDetails-image"><img src={`http://localhost:8000/images/`+Inventory.img_URL} alt="Product"/></td>
                <td className="productDetails-name">{Inventory.name}</td>
                <td className="productDetails-price">{Inventory.price}</td>
                <td className="productDetails-disPrice">{Inventory.price-(Inventory.price*(Inventory.discount/100))}</td>
                <td className="productDetails-quantity">{Inventory.quantity}</td>
            </table>
            </Link>
        </div>
     );
}
 
export default ProductDetails;