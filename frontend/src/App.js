import './App.css';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from "webfontloader";
import React from 'react';
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

function App() {

  const {isAuthenticated, user} = useSelector(state => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());
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
        <Route path='/password/forgot' element={<ForgotPassword/>} />
        <Route path='/password/reset/:token' element={<ResetPassword/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/products/:keyword' element={<Products/>} />
        <Route path='/Search' element={<Search/>} />
        <Route path='/login' element={<LoginSignUp/>} />
      </Routes>
       <Footer/>
    </Router>
  );
}

export default App;
