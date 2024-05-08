import { Link } from "react-router-dom";
import { Home, Category, Notifications, MonetizationOn } from "@mui/icons-material"; 

const Status = (props) => {
    const totalValue = props.totalvalue;
    const totalproducts = props.totalProducts;
    const totalOutOfproducts = props.outOfStock;

    return ( 
        <header>
           
                <div className="statusBoxs" style={{ textAlign: 'center', margin: 'auto',}}>
                    <div className="box1" style={{ width:'250px', height:'130px'}}>
                        <Home /> 
                        <h3>Total Products:</h3>
                        <h3>{totalproducts}</h3>
                    </div>
                    <div className="box2" style={{ width:'250px', height:'130px'}}>
                        <Category /> 
                        <h3>All Categories:</h3>
                        <h3>7</h3>
                    </div>
                    <div className="box3" style={{ width:'250px', height:'130px'}}>
                        <Link to='/supply-management/notifications'>
                            <Notifications /> 
                            <h3>Out of Stock:</h3>
                            <h3>{totalOutOfproducts}</h3> 
                        </Link>                         
                    </div>
                    <div className="box4" style={{ width:'250px', height:'130px'}}>
                        <MonetizationOn /> 
                        <h3>Total Value:</h3>
                        <h3>{totalValue}</h3>
                    </div>
                </div>
            
        </header>
     );
}
 
export default Status;
