import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <section>
        <div className="container">
          <Outlet />
        </div>
      </section>
    </>
  );
}
