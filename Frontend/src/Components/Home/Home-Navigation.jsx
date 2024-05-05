import homeCss from "./home.module.css";

const navigationBar = () => {
    return ( 
        <div className={homeCss.navbar}>
        <div className={homeCss.logo}>Logo</div>
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