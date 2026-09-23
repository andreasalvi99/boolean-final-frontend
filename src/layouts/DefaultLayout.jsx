import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function DefaultLayout() {
  const [isVisible, setIsVisible] = useState(false)
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  return (
    <>
      <ScrollToTop />

      <Header 
      cart={cart} 
      setCart={setCart}
      />
      
      <Outlet context={{ cart, setCart, isVisible, setIsVisible }} />

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div className={`toast ${isVisible ? "show" : ""} align-items-center bg-success text-white`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
                Aggiunto al carrello
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
