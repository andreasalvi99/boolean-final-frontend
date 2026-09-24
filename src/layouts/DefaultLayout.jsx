import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function DefaultLayout() {
  const [isVisible, setIsVisible] = useState(false);
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

      <Header cart={cart} setCart={setCart} />

      <Outlet context={{ cart, setCart, isVisible, setIsVisible }} />

      <Toast isVisible={isVisible} />

      <Footer />
    </>
  );
}
