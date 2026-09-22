import { NavLink, Outlet, useLocation, useMatch } from "react-router-dom"
import Footer from "../components/Footer"
import logo from "../assets/img/logo.png";


export default function CheckoutLayout() {

    const isPaymentPage = useMatch("/payment/:orderId")
    const isOrderSuccessPage = useMatch("/orders/:orderId/success")

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
            (<div className="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '2px'}}>
                <div className="progress-bar bg-success" style={{width: '33%'}}></div>
            </div>
        )}
            {isPaymentPage && 
            (<div className="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '2px'}}>
                <div className="progress-bar bg-success" style={{width: '66%'}}></div>
            </div>
        )} 
            {pathname !== "/checkout" && !isPaymentPage && 
            (<div className="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '2px'}}>
                <div className="progress-bar bg-success" style={{width: '100%'}}></div>
            </div>
        )}
        <div className="d-flex justify-content-between align-items-center mt-3 fs-4">
            <span className={pathname !== "/checkout" ? "opacity-25" : ""}>Dati di fatturazione</span>
            <span className={!isPaymentPage ? "opacity-25" : ""}>Pagamento</span>
            <span className={!isOrderSuccessPage ? "opacity-25" : ""}>Ordine effettuato</span>
        </div>
                <Outlet/>
            </div>
        </section>
        <Footer/>
        </>
    )
}