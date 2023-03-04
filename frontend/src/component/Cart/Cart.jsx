import React, { Fragment } from 'react';
import "./Cart.css";
import CartItemsCard from "./CartItemsCard.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart, removeItemFromCart } from '../../actions/cartAction';
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from "react-router-dom";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

const Cart = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if(stock <= quantity){
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if(1 >= quantity){
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const checkoutHandler = () => {
        history("/login?redirect=shipping");
    }

  return (
    <Fragment>
        {cartItems.length === 0 ? 
            (
                <div className='emptyCart'>
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) :
            (
                <Fragment>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
           
            {cartItems && cartItems.map((item) => (
                 <div className="cartContainer" key={item.product}>
                 <CartItemsCard item={item} deleteCartItems={deleteCartItems}/>
                 <div className="cartInput">
                     <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                     <input readOnly type="number" value={item.quantity}/>
                     <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                 </div>
                 <p className='cartSubtotal'>{`Rs${item.price * item.quantity}`}</p>
             </div>
            ))}

            <div className="cartGrossTotal">
                <div></div>
                <div className="cartGrossTotalBox">
                    <p>Gross Total</p>
                    <p>{`Rs${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                    )}`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                    <button onClick={checkoutHandler}>Check Out</button>
                </div>
            </div>
        </div>
    </Fragment>
            )}
    </Fragment>
  )
}

export default Cart