import logo from "../assets/img/logo.png";

export default function Footer() {
  return (
    <>
      <section id="footer" className="bg-dark text-light mt-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={logo}
                  alt=""
                  style={{ height: "250px", width: "250px" }}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="d-flex justify-content-center align-items-center flex-column gap-3 h-100">
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
            <div className="col-3">
              <div className="d-flex justify-content-center align-items-center flex-column gap-3 h-100">
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
            <div className="col-3">
              <div className="d-flex justify-content-center align-items-center flex-column gap-3 h-100">
                <h4 className="text-decoration-none text-light">Social</h4>
                <div className="d-flex justidy-content-between align-items-center gap-3 fs-2">
                  <span>
                    <i className="bi bi-instagram"></i>
                  </span>
                  <span>
                    <i className="bi bi-facebook"></i>
                  </span>
                  <span>
                    <i className="bi bi-twitter-x"></i>
                  </span>
                  <span>
                    <i className="bi bi-reddit"></i>
                  </span>
                  <span>
                    <i className="bi bi-discord"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
