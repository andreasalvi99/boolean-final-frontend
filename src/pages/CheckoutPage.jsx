import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {

    const navigate = useNavigate();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
    

    const total = cart.reduce((total, item) => {
        return total + (item.quantity * item.comic.price)
    }, 0)

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address_type: "",
        address: "",
        house_number: "",
        city: "",
        province: "",
        zipcode: "",
        shipping_method: ""
    })

    function handleChanges(e) {
        const {name, value} = e.target

        setFormData({
            ...formData, [name]: value
        })
    }

    async function createOrder(e) {
        e.preventDefault()
        console.log("funzione partita");
        
       const response = await axios.post("https://laravel-final-backend.onrender.com/api/orders", {
            ...formData,
            total,

            comics: cart.map((item) => {
                return(
                    {
                        comic_id: item.comic.id,
                        quantity: item.quantity,
                        price: item.comic.price
                    }
                )
            })
       })
       navigate("/payment")
    }

    return(
    <section id="main-content">
        <div className="container mt-5 bebas-neue-regular">
            <h1>Dettagli di fatturazione</h1>
            <form className="row g-3 mt-3" onSubmit={createOrder}>
                <div className="col-md-3">
                    <label htmlFor="firstname" className="form-label">Nome</label>
                    <input name="firstname" type="text" className="form-control" id="firstname" value={formData.firstname} onChange={handleChanges}/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="lastname" className="form-label">Cognome</label>
                    <input  name="lastname" type="text" className="form-control" id="lastname" value={formData.lastname} onChange={handleChanges}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input name="email"  type="text" className="form-control" id="email" value={formData.email} onChange={handleChanges}/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="address_type" className="form-label">
                        Toponimo
                    </label>
                    <select name="address_type"  id="address_type" className="form-select" value={formData.address_type} onChange={handleChanges}>
                        <option value="">Scegli...</option>
                        <option value="via">Via</option>
                        <option value="viale">Viale</option>
                        <option value="piazza">Piazza</option>
                        <option value="corso">Corso</option>
                        <option value="largo">Largo</option>
                        <option value="vicolo">Vicolo</option>
                        <option value="borgo">Borgo</option>
                        <option value="strada">Strada</option>
                        <option value="contrada">Contrada</option>
                        <option value="piazzale">Piazzale</option>
                        <option value="circonvallazione">Circonvallazione</option>
                        <option value="lungomare">Lungomare</option>
                        <option value="rotonda">Rotonda</option>
                        <option value="traversa">Traversa</option>
                        <option value="strada-provinciale">Strada provinciale</option>
                    </select>
                </div>
                <div className="col-md-9">
                    <label htmlFor="address" className="form-label">Indirizzo</label>
                    <input name="address"  type="text" className="form-control" id="address" value={formData.address} onChange={handleChanges}/>
                </div>
                <div className="col-md-1">
                    <label htmlFor="house_number" className="form-label">N°</label>
                    <input  name="house_number" type="text" className="form-control" id="house_number" value={formData.house_number} onChange={handleChanges}/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="city" className="form-label">Città</label>
                    <input name="city"  type="text" className="form-control" id="city" value={formData.city} onChange={handleChanges}/>
                </div>
                <div className="col-md-1">
                    <label htmlFor="province" className="form-label">Provincia</label>
                    <input name="province"  type="text" className="form-control" id="province" value={formData.province} onChange={handleChanges}/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="zipcode" className="form-label">CAP</label>
                    <input name="zipcode"  type="number" className="form-control" id="zipcode" value={formData.zipcode} onChange={handleChanges}/>
                </div>
                {/* <div className="col-12">
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck"/>
                    <label className="form-check-label" htmlFor="gridCheck">
                        Spedire a un indirizzo diverso?
                    </label>
                    </div>
                </div> */}
                <div className="row mt-5">
                    <div className="col-6 bg-secondary-subtle rounded p-2">
                        <table className="table table-sm mb-0 table-secondary">
                            <thead>
                                <tr>
                                <th scope="col">Prodotto</th>
                                <th scope="col">Subtotale</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {cart.map((item) => {
                                            return(
                                                <ul className="list-group">
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
                                            <ul className="list-group">
                                                <li className="list-group">
                                                    <div className="d-flex justify-content-between align-items-center gap-5 me-5">
                                                        <span>&euro; {item.comic.price}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                    )})}
                                    </td>
                                </tr>
                                <tr>
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
                                                Express (5 gg)
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                <td>Totale</td>
                                <td>
                                    &euro; {cart.reduce((total, item) => {
                                    return(
                                        total + (item.comic.price * item.quantity)
                                    )
                                }, 0)}
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <button type="submit" className="btn btn-success mb-5">Vai al pagamento <i className="bi bi-arrow-right"></i></button>
                
            </form>
        </div>
    </section> )
}