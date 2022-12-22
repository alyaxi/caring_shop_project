import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Superlogin, clearErrors, logout } from "../../actions/userActions";

const SuperLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      alert.success("Logged in to super-admin!");
      history.push("super-admin/dashboard");
    }
    if (error) {
      alert.error("Wrong Email or password");
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(Superlogin(email, password));
  };
  const logoutHandler = () => {
    dispatch(logout());
    alert.success(
      "Logged out! Beacause you are trying to log in as Super-admin. "
    );
  };
  useEffect(() => {
    if (isAuthenticated) {
      logoutHandler();
    }
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Super-admin"} />
          <div className="container mt-100 pt-100">
            <h3 className="title-30 text-center mb-35">Login to super-admin</h3>
            <form className="login-form" onSubmit={submitHandler}>
              <div className="row d-flex flex-column justify-content-center align-items-center">
                <div className="col-4">
                  <div className="form-inner">
                    <label htmlFor="email_field">Email</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="fname"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-inner hidden-icon">
                    <label htmlFor="email_password">Passwords</label>
                    <input
                      type="password"
                      name="name"
                      placeholder="abcdef*****"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-4 mt-4">
                  <div className="form-inner d-flex flex-column align-items-center">
                    <button className="primary--btn login-btn" type="submit">
                      login Super-admin
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SuperLogin;
