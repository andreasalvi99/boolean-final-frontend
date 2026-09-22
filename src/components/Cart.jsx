import { Offcanvas } from "bootstrap";
import { useNavigate } from "react-router-dom";

export default function Cart({cart, setCart}) {

    const navigate = useNavigate();

  function handleCheckout() {
    const element = document.getElementById("offcanvasRight");

    element.addEventListener(
      "hidden.bs.offcanvas",
      () => navigate("/checkout"),
      { once: true }
    );

    Offcanvas.getOrCreateInstance(element).hide();
  } 

  function removeFromCart(cartItem) {
    const updatedCart = cart.filter((item) => {
      return cartItem.comic.id !== item.comic.id
    })
    setCart(updatedCart);
  }

  function reduceQuantity(cartItem) {
    cartItem.quantity -= 1;

    if(cartItem.quantity === 0) {
      removeFromCart(cartItem);
    }else{
      setCart([...cart]);
    }
  }

  function increaseQuantity(cartItem) {
    cartItem.quantity += 1;

    setCart([...cart]);
  }

    return(
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div className="offcanvas-header pb-1">
      <h5 className="offcanvas-title bangers-regular h3" id="offcanvasRightLabel">Il tuo carrello</h5>
      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    {cart.length === 0 && (
      <div className="offcanvas-body bebas-neue-regular pt-1 fs-4 d-flex justify-content-center align-items-center">
        <p>Il carrello è vuoto</p>
      </div>
    )}
    {cart.length > 0 && (
          <div className="offcanvas-body bebas-neue-regular pt-1 fs-4">
      <div className="d-flex justify-content-end align-items-center mb-2">
        {cart.length > 0 ? <button className="btn btn-danger" type="button" onClick={() => setCart([])}>Svuota carrello</button> : ""}
      </div>
      <div className="row row-cols-1 g-3 fs-5">
      {cart.map((item) => {
        return(
          <div className="col fs-5" key={item.comic.id}>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={`https://laravel-final-backend.onrender.com/img/${item.comic.cover_img}`} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body d-flex flex-column justify-content-between h-100 pb-2">
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <h4 className="card-title m-0">{item.comic.title}</h4>
                    <button className="btn btn-danger btn-sm" type="button" onClick={() => removeFromCart(item)}>
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                  <div className="d-flex justify-content-between align-items-end">
                    <div className="mb-0 d-flex justify-content-center align-items-center gap-2">
                      <span>
                      Quantità: 
                      </span>
                      <div>
                        <button className="btn btn-light btn-sm" type="button" onClick={() => reduceQuantity(item)}>-</button>
                        <span className="mx-1">{item.quantity}</span>
                        <button className="btn btn-light btn-sm" type="button" onClick={() => increaseQuantity(item)}>+</button>
                      </div>
                    </div>
                    <p className="mb-0">{Math.round(item.comic.price * item.quantity * 100) / 100}&euro;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )
      })}
      </div>
    </div>
    )}
      <div className="d-flex justify-content-between bangers-regular align-items-center px-2 border border-dark-subtle border-end-0 border-start-0 border-bottom-0">
      <h4 className="offcanvas-title my-2">Totale :</h4>
      {cart.length > 0 && (
        <span className="fs-4">{cart.reduce((total, item) => total + (item.comic.price * item.quantity), 0).toFixed(2)}&euro;</span>
      )}
      {cart.length === 0 && (
        <span className="fs-4"></span>
      )}
      </div>
      <button type="button" className="btn btn-success mx-2 mb-2"
                disabled={cart.length === 0} onClick={handleCheckout}>
          <span className="bebas-neue-regular fs-5">
          CHECKOUT <i className="bi bi-arrow-right"></i>
          </span>
      </button>
    
  </div>
    )
}