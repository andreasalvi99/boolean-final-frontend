export default function OrderSuccess() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);

    console.log(cart);
    

    return(
        <>
            <h1 className="mt-3 bangers-regular">Complimenti!!</h1>
            <p className="oswald-special fs-5">Il tuo ordine è stato inviato, a breve riceverai una mail di conferma con il link di tracciamento. Grazie per aver scelto Nextpanel.</p>
        
            <h2>Riepilogo ordine:</h2>
            
        
        </>
    )
}