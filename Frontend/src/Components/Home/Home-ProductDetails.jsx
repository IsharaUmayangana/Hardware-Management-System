import { Link } from "react-router-dom";
import homeCss from "./home.module.css";

const HomeProductDetails = ({Inventory}) => {
    return ( 
        <div className={homeCss.homeProductDetails}>
            <Link to={ `http://localhost:5173/cusSelectedItem/${Inventory._id}`}>
                <div className={homeCss.productPicture}><img src={`http://localhost:8000/images/`+Inventory.img_URL} alt="Product" /></div>
                <br></br>
                <div><strong>{Inventory.name}</strong></div>
                <div>Rs {Inventory.price}.00</div>
            </Link>
        </div>
     );
}
 
export default HomeProductDetails;