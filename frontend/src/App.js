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

function App() {
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
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/product/:id' element={<ProductDetails/>} />
        <Route exact path='/products' element={<Products/>} />
        <Route path='/products/:keyword' element={<Products/>} />
        <Route exact path='/Search' element={<Search/>} />
        <Route exact path='/login' element={<LoginSignUp/>} />
      </Routes>
       <Footer/>
    </Router>
  );
}

export default App;
