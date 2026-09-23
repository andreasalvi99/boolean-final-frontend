import { useState } from "react"
import CheckoutForm from "../components/CheckoutForm"

export default function CheckoutPage() {

    cons [isLoading, setIsLoading] = useState(true)

    return(
    <section id="main-content">
        <div className="container mt-5 oswald-special">
            <CheckoutForm 
            isLoading={isLoading}
            setIsLoading={setIsLoading}/>
        </div>
    </section>
    )
}