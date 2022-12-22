import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

// Cart Imports
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

// Order Imports
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

// Auth or User imports
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Admin Imports
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import ProductReviews from "./components/admin/ProductReviews";

import ProtectedRoute from "./components/route/ProtectedRoute";
import SuperProtectedRoute from "./components/route/SuperProtectedRoute";
import { loadUser } from "./actions/userActions";
import store from "./store";
import axios from "axios";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserPage from "./components/user/UserPage";
import Contact from "./components/Contact";

//super-admin
import SuperLogin from "./components/super-admin/login";
import SuperDashboard from "./components/super-admin/Dashboard";
import SuperProductsList from "./components/super-admin/ProductsList";
import SuperNewProduct from "./components/super-admin/NewProduct";
import SuperUpdateProduct from "./components/super-admin/UpdateProduct";
import SuperOrdersList from "./components/super-admin/OrdersList";
import SuperProcessOrder from "./components/super-admin/ProcessOrder";
import SuperUsersList from "./components/super-admin/UsersList";
import SuperUpdateUser from "./components/super-admin/UpdateUser";
import SuperProductReviews from "./components/super-admin/ProductReviews";
import SuperNewCategory from "./components/super-admin/NewCategory";
import SuperCategorysList from "./components/super-admin/CatagoryList";

function App() {
  //To get the route
  // const locationIx = useLocation();

  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");

      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* {!location.pathname.includes("super-admin") ? <Header /> : ""} */}
        <Header />
        <div className="">
          <Route path="/" component={Home} exact />
          <Route path="/contact" component={Contact} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} exact />

          <Route path="/cart" component={Cart} exact />

          <ProtectedRoute path="/shipping" component={Shipping} />
          <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
          <ProtectedRoute path="/success" component={OrderSuccess} />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          )}

          <Route path="/login" component={UserPage} />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />

          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
        </div>

        <ProtectedRoute
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
          exact
        />
        <ProtectedRoute
          path="/admin/products"
          isAdmin={true}
          component={ProductsList}
          exact
        />
        <ProtectedRoute
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
          exact
        />
        <ProtectedRoute
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
          exact
        />
        <ProtectedRoute
          path="/admin/orders"
          isAdmin={true}
          component={OrdersList}
          exact
        />
        <ProtectedRoute
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
          exact
        />
        <ProtectedRoute
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
          exact
        />

        {/* super-admin routes */}

        <Route path="/super-admin" component={SuperLogin} exact />
        <SuperProtectedRoute
          isAdmin={true}
          path="/super-admin/dashboard"
          component={SuperDashboard}
          exact
        />
        <SuperProtectedRoute
          isAdmin={true}
          path="/super-admin/products"
          component={SuperProductsList}
          exact
        />
        <SuperProtectedRoute
          isAdmin={true}
          path="/super-admin/product"
          component={SuperNewProduct}
          exact
        />
        <SuperProtectedRoute
          isAdmin={true}
          path="/super-admin/category"
          component={SuperCategorysList}
          exact
        />
        <SuperProtectedRoute
          isAdmin={true}
          path="/super-admin/category/new"
          component={SuperNewCategory}
          exact
        />
        <SuperProtectedRoute
          isAdmin={true}
          path="/super-admin/product/:id"
          component={SuperUpdateProduct}
          exact
        />
        <SuperProtectedRoute
          isAdmin={true}
          path="/super-admin/orders"
          component={SuperOrdersList}
          exact
        />
        <SuperProtectedRoute
          isAdmin={true}
          path="/super-admin/order/:id"
          Route
          component={SuperProcessOrder}
          exact
        />
        <SuperProtectedRoute
          isAdmin={true}
          path="/super-admin/users"
          component={SuperUsersList}
          exact
        />
        <SuperProtectedRoute
          isAdmin={true}
          path="/super-admin/user/:id"
          component={SuperUpdateUser}
          exact
        />
        <SuperProtectedRoute
          isAdmin={true}
          path="/super-admin/reviews"
          component={SuperProductReviews}
          exact
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
