import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderSuccess() {

    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
    
    function fetchOrderDetails() {
        axios.get(`https://laravel-final-backend.onrender.com/api/orders/${orderId}`).then((response) => {
            setOrder(response.data.order)
        }).catch((error) => {
            console.log(error.response.data);
        })
    }

    const cartAmount = order?.comics?.reduce((total, comic) => {
        return(
             total + (comic.pivot.quantity * Number(comic.pivot?.price))
        )
    }, 0) ?? 0

    const shippingPrice = order ? Number(order.total) - cartAmount : 0

    useEffect(fetchOrderDetails, [orderId])

    return(
        <>
            <h1 className="mt-3 bangers-regular">Complimenti!!</h1>
            <p className="oswald-special fs-5">Il tuo ordine è stato inviato, a breve riceverai una mail di conferma con il link per il tracciamento. Grazie per aver scelto Nextpanel.</p>
        
            <h2>Riepilogo ordine:</h2>
            <div className="row my-4">
                <div className="col-8 bg-light rounded p-2 border border-dark border-opacity-25">
                    <table className="table table-light table-borderless align-middle">
                        <thead className="border-bottom">
                            <tr>
                            <th scope="col">Prodotto</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">Subtotale</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.comics?.length > 0 && (
                                order?.comics?.map((comic) => {
                                    return(
                                        <tr key={comic.id}>
                                            <td scope="row">
                                                <img src={`https://laravel-final-backend.onrender.com/img/${comic.cover_img}`} alt="" style={{height: "60px", width: "45px"}}/>
                                            </td>
                                            <td>{comic.title}</td>
                                            <td>x{comic.pivot.quantity}</td>
                                            <td>{comic.pivot.quantity * comic.price}&euro;</td>
                                        </tr>
                                    )
                                })
                            )}
                            <tr className="border-top border-bottom">
                                <td>Spedizione</td>
                                <td>{order?.shipping_method}</td>
                                <td></td>
                                <td>{shippingPrice.toFixed(2)}&euro;</td>
                            </tr>
                        </tbody>
                        <tfoot className="border-top">
                            <tr>
                                <td>Totale</td>
                                <td></td>
                                <td></td>
                                <td>{order?.total}&euro;</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}