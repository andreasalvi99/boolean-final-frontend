import logo from "../assets/img/logo.png";

export default function Footer() {
  return (
    <>
      <section id="footer" className="bg-dark text-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-12">
              <div className="d-flex justify-content-center align-items-start">
                <img
                  src={logo}
                  alt=""
                  style={{ minHeightheight: "250px", minWidthwidth: "250px" }}
                />
              </div>
            </div>
            <div className="col-4 col-lg-3">
              <div className="d-flex justify-content-center align-items-start flex-column gap-3 h-100">
                <a href="#" className="text-decoration-none text-light">
                  Lavora con noi
                </a>
                <a href="#" className="text-decoration-none text-light">
                  Dove siamo
                </a>
                <a href="#" className="text-decoration-none text-light">
                  About us
                </a>
                <a href="#" className="text-decoration-none text-light">
                  FAQs
                </a>
                <a href="#" className="text-decoration-none text-light">
                  Placeholder
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-4">
              <div className="d-flex justify-content-center align-items-start flex-column gap-3 h-100">
                <a href="#" className="text-decoration-none text-light">
                  Placeholder
                </a>
                <a href="#" className="text-decoration-none text-light">
                  Placeholder
                </a>
                <a href="#" className="text-decoration-none text-light">
                  Placeholder
                </a>
                <a href="#" className="text-decoration-none text-light">
                  Placeholder
                </a>
                <a href="#" className="text-decoration-none text-light">
                  Placeholder
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-4">
              <div className="d-flex justify-content-center align-items-center flex-column gap-3 h-100">
                <h4 className="text-decoration-none text-light">Social</h4>
                <div className="d-flex justify-content-between align-items-center gap-3 fs-2 flex-wrap">
                  <a href="#" className="text-decoration-none text-light">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="text-decoration-none text-light">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="text-decoration-none text-light">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a href="#" className="text-decoration-none text-light">
                    <i className="bi bi-reddit"></i>
                  </a>
                  <a href="#" className="text-decoration-none text-light">
                    <i className="bi bi-discord"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
