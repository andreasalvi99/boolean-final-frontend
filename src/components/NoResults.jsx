import None from "../assets/img/8bcauw920frc1.png";

export default function NoResults() {
  return (
    <section id="main-content">
      <div className="container d-flex justify-content-center gap-5">
        <h3 className="align-self-center">
          Ops.... sembra che la tua ricerca non sia andata a buon fine
        </h3>
        <img src={None} alt="" className="" />
      </div>
    </section>
  );
}
