import React from "react";
import "../footer-components/footer.css";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <div>
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon color="secondary" icon="gem" className="me-3" />
                  JestDili
                </h6>
                <p>
                  Eşitmə və nitq məhdudiyyəti olan şəxslərin və onların
                  yaxınlarının istifadəsi məqsədi ilə Azərbaycan jest dili
                  lüğəti və bu lüğətin yerləşdirildiyi veb-sayt “Karlara dəstək”
                  İctimai Birliyi tərəfindən hazırlanıb.
                </p>
                <div>
                  {/* <a href="" className="me-4 text-reset">
                    <MDBIcon color="secondary" fab icon="facebook-f" />
                  </a>
                  <a href="" className="me-4 text-reset">
                    <MDBIcon color="secondary" fab icon="twitter" />
                  </a>
                  */}
                  <a href="https://www.instagram.com/jestdili.az/" className="me-4 text-reset">
                    <MDBIcon color="secondary" fab icon="instagram" />
                  </a>
                  {/* <a href="" className="me-4 text-reset">
                    <MDBIcon color="secondary" fab icon="linkedin" />
                  </a>
                  <a href="" className="me-4 text-reset">
                    <MDBIcon color="secondary" fab icon="github" />
                  </a> */}
                </div>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <p>
                  <a href="/home" className="text-reset">
                    Ana səhifə
                  </a>
                </p>
                <p>
                  <a href="/dictionary" className="text-reset">
                    Lüğət
                  </a>
                </p>
                <p>
                  <a href="/blog" className="text-reset">
                    Blog
                  </a>
                </p>
                <p>
                  <a href="/faq" className="text-reset">
                    F.A.Q
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <p>
                  <a href="/profile" className="text-reset">
                    Profile
                  </a>
                </p>
                
                
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <p>
                  <MDBIcon color="secondary" icon="home" className="me-2" />
                  Sualınız olarsa, bizdən soruşun!
                </p>
                <p>
                  <MDBIcon color="secondary" icon="envelope" className="me-3" />
                  info@jestdili.az
                </p>
                <p>
                  <MDBIcon color="secondary" icon="phone" className="me-3" />+
                  994 70 317 56 44
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023{" "}
          <a className="text-reset fw-bold" href="https://jestdili.az/">
            jestdili.az
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default Footer;
