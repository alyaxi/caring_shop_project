import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isVendor, setIsVendor] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [application, setApplication] = useState("");
  const [productsInfo, setProductsInfo] = useState("");

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const history = useHistory();

  useEffect(() => {
    console.log("IsAuthendicated: ", isAuthenticated);
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
    formData.set("isVendor", isVendor);

    if (isVendor) {
      formData.set("brand_name", brandName);
      formData.set("brand_application", email);
      formData.set("possible_products", productsInfo);
    }

    console.log(formData);

    dispatch(register(formData));
  };

  const onchange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />

      <h3 className="title-30 text-center mb-35">Register Your Account</h3>

      <form
        className="login-form"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <div className="row">
          <div className="col-12">
            <div className="form-inner">
              <label htmlFor="name_field">Name</label>
              <input
                type="name"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={onchange}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-inner">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={onchange}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-inner hidden-icon">
              <label htmlFor="password_field">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="abcdef*****"
                value={password}
                onChange={onchange}
              />
            </div>
          </div>
          <div className="d-flex flex-direction-row justify-content-between align-items-center">
            <label className="fs-5">Do you want to become a vendor?</label>
            <input
              type="checkbox"
              name="vendor-radio"
              checked={isVendor}
              onChange={() => setIsVendor(!isVendor)}
              style={{
                height: "1.5rem",
                width: "1.5rem",
              }}
            />
          </div>
          {isVendor ? (
            <>
              <div className="col-12">
                <div className="form-inner">
                  <label htmlFor="brand_field">Brand Name</label>
                  <input
                    type="text"
                    name="brand-name"
                    placeholder="Your Brand name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                  <label htmlFor="application_field">Application</label>
                  <textarea
                    id="brand-applicaton"
                    name="application"
                    rows="4"
                    cols="50"
                    placeholder="Please type a detailed application..."
                    value={application}
                    onChange={(e) => setApplication(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                  <label htmlFor="products_info_filed">Your Products</label>
                  <textarea
                    id="products"
                    name="products-info"
                    rows=""
                    cols="50"
                    placeholder="Please enter all the products that you want to sell..."
                    value={productsInfo}
                    onChange={(e) => setProductsInfo(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-pill"
                    alt="Avatar Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onchange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5">
            <div className="form-inner">
              <button
                className="primary--btn login-btn"
                type="submit"
                disabled={loading ? true : false}
              >
                CREATE AN ACCOUNT
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
