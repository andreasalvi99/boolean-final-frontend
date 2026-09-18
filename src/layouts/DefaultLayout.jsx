import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { Carousel } from "bootstrap";
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
  const [cart, setCart] = useState([]);

  return (
    <>
      <ScrollToTop />

      <Header cart={cart} setCart={setCart} />
      <Outlet context={{ cart, setCart }} />
      <Footer />
    </>
  );
}
