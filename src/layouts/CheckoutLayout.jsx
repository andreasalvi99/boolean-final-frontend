import { NavLink, Outlet, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import logo from "../assets/img/logo.png";

export default function CheckoutLayout() {

    const { pathname } = useLocation()

    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top bebas-neue-regular">
            <div className="container">
                <NavLink to="/">
                    <img src={logo} alt="" className="navbar-logo" />
                </NavLink>
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>

      
            <section id="main-content">
                <div className="container mt-5 bebas-neue-regular">
                {pathname === "/checkout" && 
                (<div className="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '5px'}}>
                    <div className="progress-bar bg-success" style={{width: '33%'}}></div>
                </div>)}
               
                {pathname === "/payment" && 
                (<div className="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '5px'}}>
                    <div className="progress-bar bg-success" style={{width: '66%'}}></div>
                </div>)} 
                 
                {pathname !== "/checkout" && pathname !== "/payment" && 
                (<div className="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '5px'}}>
                    <div className="progress-bar bg-success" style={{width: '100%'}}></div>
                </div>)}
                    <Outlet/>
                </div>
            </section>
            <Footer/>
        </>
    )
}