export default function CheckoutPage() {
    return(
    <section id="main-content">
        <div className="container mt-5">
            <div className="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '5px'}}>
                <div className="progress-bar bg-success" style={{width: '25%'}}></div>
            </div>
            <form className="row g-3 mt-3">
                <div className="col-md-3">
                    <label htmlFor="firstname" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="firstname"/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="lastname" className="form-label">Cognome</label>
                    <input type="text" className="form-control" id="lastname"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email"/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="address" className="form-label">
                        Toponimo
                    </label>
                    <select id="address" className="form-select">
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
                    <input type="text" className="form-control" id="address"/>
                </div>
                <div className="col-md-1">
                    <label htmlFor="house_number" className="form-label">N°</label>
                    <input type="text" className="form-control" id="house_number"/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city"/>
                </div>
                <div className="col-md-1">
                    <label htmlFor="province" className="form-label">Provincia</label>
                    <input type="text" className="form-control" id="province"/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="cap" className="form-label">CAP</label>
                    <input type="text" className="form-control" id="cap"/>
                </div>
                {/* <div className="col-12">
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck"/>
                    <label className="form-check-label" htmlFor="gridCheck">
                        Check me out
                    </label>
                    </div>
                </div> */}
                <div className="col-12">
                    <button type="submit" className="btn btn-success">Vai al pagamento <i className="bi bi-arrow-right"></i></button>
                </div>
            </form>
        </div>
    </section> )
}