import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function OrderSuccess() {

    const { orderId } = useParams()

    // console.log(cart);
    
    function fetchOrderDetails() {
        axios.get(`https://laravel-final-backend.onrender.com/api/orders/${orderId}`).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error.response.data);
        })
    }

    useEffect(fetchOrderDetails, [orderId])

    return(
        <>
            <h1 className="mt-3 bangers-regular">Complimenti!!</h1>
            <p className="oswald-special fs-5">Il tuo ordine è stato inviato, a breve riceverai una mail di conferma con il link di tracciamento. Grazie per aver scelto Nextpanel.</p>
        
            <h2>Riepilogo ordine:</h2>
            <div className="row mt-5 fs-5 oswald-special">
                    <div className="col-8 bg-light rounded p-2 border border-dark border-opacity-25">
                        <table className="table table-sm mb-0 table-light">
                            <thead>
                                <tr>
                                <th scope="col">Prodotto</th>
                                <th scope="col">Subtotale</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td>
                                        {cart.map((item) => {
                                            return(
                                                <ul className="list-group" key={item.comic.id}>
                                                    <li className="list-group">
                                                        <div className="d-flex justify-content-between align-items-center gap-5 me-5">
                                                            <span>{item.comic.title}</span>
                                                            <span>x {item.quantity}</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                        )})}
                                    </td>
                                    <td>
                                        {cart.map((item) => {
                                            return(
                                            <ul className="list-group" key={item.comic.id}>
                                                <li className="list-group">
                                                    <div className="d-flex justify-content-between align-items-center gap-5 me-5">
                                                        <span>&euro; {(item.comic.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                    )})}
                                    </td> */}
                                </tr>
                                {/* <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <span>Spedizione</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="shipping_method" id="shipping_standard" value="standard" onChange={handleChanges} checked={formData.shipping_method === "standard"}/>
                                            <label className="form-check-label" htmlFor="shipping_standard">
                                                Standard
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="shipping_method" id="shipping_express" value="express" onChange={handleChanges} checked={formData.shipping_method === "express"}/>
                                            <label className="form-check-label" htmlFor="shipping_express">
                                                Express (5 gg): {expressShippingFee}&euro;
                                            </label>
                                        </div>
                                    </td>
                                </tr> */}
                                <tr>
                                <td>Totale</td>
                                <td>
                                    {/* &euro; {total}  */}
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        
        </>
    )
}