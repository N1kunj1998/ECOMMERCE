import React, { useEffect } from 'react';
import Sidebar from "./Sidebar.jsx";
import "./Dashboard.css";
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Doughnut, Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement, Tooltip, Legend
  } from "chart.js";
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction.js';
import { getAllOrders } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/userAction.js';
  
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement, Tooltip, Legend
  );
  
const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);

    let outOfStock = 0;

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
      }, [dispatch]);

    products && 
        products.forEach((item) => {
            if(item.Stock === 0) {
                outOfStock += 1;
            }
        });
    
    let totalAmount = 0;

    orders && orders.forEach((item) => {
      totalAmount += item.totalPrice;
    })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label : "TOTAL AMOUNT",
            fill:true,
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
          }
        ],
      };

    const doughnutState = {
        labels: ["Out of stock", "In Stock"],
        datasets: [{
            backgroundColor: ["#00A684", "#680084"],
            hoverBackgroundColor: ["#485000", "#35014F"],
            data: [outOfStock, products.length - outOfStock]
        }]
    }
    
  return (
    <div className='dashboard'>
        <Sidebar />
        <div className='dashboardContainer'>
            <Typography component="h1">Dashboard</Typography>
            <div className="dashboardSummary">
                <div>
                    <p>
                        Total Amount <br /> Rs {totalAmount}
                    </p>
                </div>
                <div className="dashboardSummaryBox2">
                    <Link to="/admin/products">
                        <p>Product</p>
                        <p>{products && products.length}</p>
                    </Link>
                    <Link to="/admin/orders">
                        <p>Orders</p>
                        <p>{orders && orders.length}</p>
                    </Link>
                    <Link to="/admin/users">
                        <p>Users</p>
                        <p>{users && users.length}</p>
                    </Link>
                </div>
            </div>
            <div className="lineChart">
                <Line data={lineState} />
            </div>
            <div className='doughnutChart'>
                <Doughnut data={doughnutState} />
            </div>
        </div>
    </div>
  )
}

export default Dashboard