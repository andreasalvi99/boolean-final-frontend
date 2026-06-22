import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Carousel } from "bootstrap";
import { useEffect } from "react";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
