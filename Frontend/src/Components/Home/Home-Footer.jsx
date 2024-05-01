import homeCss from "./home.module.css";

const Footer = () => {
    return ( 
        <div className={homeCss.footerMain}>
            <div className={homeCss.footerSection1}>
                <div className={homeCss.footerColumn1}>
                    <img className= {homeCss.footerLogo} src={`http://localhost:8000/logos/laksiri-hardware-logo1.jpg`} alt="Product" />
                </div>
                <div className={homeCss.footerColumn2}>

                </div>
                <div className={homeCss.footerColumn3}>

                </div>
                <div className={homeCss.footerColumn4}>

                </div>
            </div>
            <div className={homeCss.footerSection1}>

            </div>
        </div>
     );
}
 
export default Footer;