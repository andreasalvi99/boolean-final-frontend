import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "../components/StripePaymentForm";

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentPage() {

    const { orderId } = useParams();

    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getPaymentIntent() {
            try {
                const response = await axios.post(
                    `https://laravel-final-backend.onrender.com/api/orders/${orderId}/payment-intent`
                );

                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error(error.response?.data || error);
                setError("Non è stato possibile preparare il pagamento.");
            }
        }

        getPaymentIntent();
    }, [orderId]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!clientSecret) {
        return <p>Preparazione del pagamento...</p>;
    }


    return (
    <section id="main-content">
        <div className="container mt-5">

            <Elements
                stripe={stripePromise}
                options={{ clientSecret }}
            >
                <StripePaymentForm />
            </Elements>
        </div>
    </section>
);
}