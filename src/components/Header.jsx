import Navbar from "./Navbar";

export default function Header({ cart, setCart }) {
  return <Navbar cart={cart} setCart={setCart} />;
}
