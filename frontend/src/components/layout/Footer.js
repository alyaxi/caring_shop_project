import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer-area footer-design-1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
              <div className="footer-wrap">
                <div className="row justify-content-between gy-5">
                  <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="single-widget">
                      <div className="footer-title">
                        <h3>About "The Caring Shop"</h3>
                      </div>
                      <div className="footerabout-content">
                        <p>
                          The Caring Shop - Pakistan's first store since 2022.
                          We sell many Category products on our web-site Of different Companies.

                          This Website is for education purpose and Non-Profitable site. 
                        </p>
                      </div>
                      <div className="footer-address">
                        <ul>
                          <li>
                            <i className="las la-phone-volume"></i>
                            <span>
                              <Link to="/">+92 304 1969296</Link>
                              <br />
                              <Link to="/">+92 323 9595323</Link>
                            </span>
                          </li>
                          <li>
                            <i className="lar la-envelope"></i>
                            <span>
                              <Link to="/">admin@thecaringshop.com</Link>
                              <br />
                              <Link to="/">thecaringshopinfo@.com</Link>
                            </span>
                          </li>
                          <li>
                            <i className="las la-map-marker"></i>
                            <span>
                              CUI WAH<br />
                              TAXILA{" "}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="single-widget text-lg-center">
                      <div className="footer-logo">
                        <Link to="/">
                          <img src="" alt="" />
                        </Link>
                      </div>
                      <div className="form-design form-design-1"></div>
                      <div className="footer-social pt-50">
                        <ul>
                          <li>
                            <Link to="/">
                              <i className="fab fa-facebook-f"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-instagram"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-linkedin-in"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-pinterest-p"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-twitter"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12">
                    <div className="single-widget">
                      <div className="footer-title">
                        <h3>Company</h3>
                      </div>
                      <div className="footer-link">
                        <ul>
                          <li>
                            <Link to="/">Privacy Policy</Link>
                          </li>
                          <li>
                            <Link to="/Contact.js">Returns</Link>
                            <p> Go to Contact Page</p>
                          </li>
                          <li>
                            <Link to="/">Terms & Conditions</Link>
                          </li>
                          <li>
                            <Link to="/">Our Support</Link>
                          </li>
                          <li>
                            <Link to="/">Terms & Service</Link>
                          </li>
                          <li>
                            <Link to="/">Checkout</Link>
                          </li>
                          <li>
                            <Link to="/">Other Issues</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 copy-right-section align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 text-lg-start text-center">
              <div className="copy-right-area">
                <p className="copy-text">Copyright 2022 The Carring Shop</p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="footer-card-support text-lg-end text-center"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
