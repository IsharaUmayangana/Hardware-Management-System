import homeCss from "./home.module.css";

const navigationBar = () => {
    return ( 
      <div className={homeCss.navbar}>
        <div className={homeCss.logo}><img className= {homeCss.navbarLogo} src={`http://localhost:8000/logos/laksiri-hardware-logo1.jpg`} alt="Product" /></div>
        <ul className={homeCss.navLinks}>
          <li>
            <a href="/userItemList">Rental Items</a>
          </li>
          <li>
            <a href="/cart">Shopping Cart </a>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </div>
     );
}
 
export default navigationBar;