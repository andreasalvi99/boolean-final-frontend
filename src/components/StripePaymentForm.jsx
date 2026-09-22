import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StripePaymentForm({total, orderId}) {
    
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setErrorMessage(error.message);
        } else if (paymentIntent?.status === "succeeded") {
            console.log("Pagamento Stripe riuscito:", paymentIntent.id);
        }

        setIsLoading(false);
        navigate(`/orders/${orderId}/success`)
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <PaymentElement />

            {errorMessage && (
                <p className="text-danger mt-3">{errorMessage}</p>
            )}

            <button
                type="submit"
                className="btn btn-success mt-3"
                disabled={!stripe || isLoading}
            >
                {isLoading ? "Pagamento in corso..." : `Paga ora ${total}`}
            </button>
        </form>
    );
}