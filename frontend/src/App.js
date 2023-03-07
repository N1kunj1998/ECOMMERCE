import './App.css';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import WebFont from "webfontloader";
import React, { useState } from 'react';
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.jsx";
import Products from "./component/Product/Products.jsx";
import Search from './component/Product/Search.jsx';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.jsx";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.jsx";
import Cart from "./component/Cart/Cart.jsx";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import Payment from "./component/Cart/Payment.jsx";
import axios from "axios";
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
import MyOrders from "./component/Order/MyOrders.jsx";
import OrderDetails from "./component/Order/OrderDetails.jsx";

function App() {

  const {isAuthenticated, user} = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/account' element={<ProtectedRoute><Profile/></ProtectedRoute > } />
        <Route path='/me/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>} />
        <Route path='/password/update' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
        <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>} />
        <Route path='/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute><MyOrders/></ProtectedRoute>} />
        <Route path='/order/:id' element={<ProtectedRoute><OrderDetails/></ProtectedRoute>} />
        <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>} />
        <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute><Payment/></ProtectedRoute></Elements>} />
        <Route path='/password/forgot' element={<ForgotPassword/>} />
        <Route path='/password/reset/:token' element={<ResetPassword/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/products/:keyword' element={<Products/>} />
        <Route path='/Search' element={<Search/>} />
        <Route path='/login' element={<LoginSignUp/>} />
        <Route path='/Cart' element={<Cart/>} />
      </Routes>
       <Footer/>
    </Router>
  );
}

export default App;
