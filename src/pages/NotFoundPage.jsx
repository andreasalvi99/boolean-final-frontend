import NotFound from "../assets/img/not-found.jpg";

export default function NotFoundPage() {
  return (
    <>
      <section id="main-content">
        <div className="container d-flex justify-content-center gap-5">
          <h3 className="align-self-center">
            Ops.... sembra che la tua ricerca non sia andata a buon fine
          </h3>
          <img src={NotFound} alt="" className="" />
        </div>
      </section>
    </>
  );
}
