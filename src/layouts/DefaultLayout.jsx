import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { Carousel } from "bootstrap";
import { useEffect } from "react";
import Footer from "../components/Footer";

export default function DefaultLayout() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <>
      <ScrollToTop />

      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
