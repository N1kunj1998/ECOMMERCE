import React, { Fragment, useEffect } from "react";
// import "./OrderList.css";
import { DataGrid } from "@material-ui/data-grid";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { getAllOrders, clearErrors, deleteOrder } from "../../actions/orderAction";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const {error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  }

  useEffect(() => {
    if(error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    if(deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
    }

    if(isDeleted === true) {
        alert.success("Order Deleted Successfully");
        history("/admin/orders");
        dispatch({type: DELETE_ORDER_RESET});
    }
    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    { field: "status", headerName: "Status", minWidth: 150, flex: 0.5,
        cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
        }
     },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidht: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
            <Fragment>
                <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                    <EditIcon />
                </Link>
                <Button onClick={() => {
                    deleteOrderHandler(params.getValue(params.id, "id"))}
                    }
                >
                    <DeleteIcon />
                </Button>
            </Fragment>
        );
      }
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item)=>{
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        });
    });
  return (
  <Fragment>
    <MetaData title={`ALL Orders - Admin`} />
    <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
            <h1 id="productListHeading">All Orders</h1>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
    </div>
  </Fragment>);
};

export default OrderList;
