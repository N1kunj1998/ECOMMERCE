import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, deleteProduct, getAdminProducts } from "../../actions/productAction";
import { Button } from "@material-ui/core";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const {error: deleteError, isDeleted } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
        alert.success("Product Deleted Successfully");
        history("/admin/dashboard");
        dispatch({type: DELETE_PRODUCT_RESET});
    }
    dispatch(getAdminProducts());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidht: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidht: 350, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      minWidht: 150,
      flex: 0.3,
      type: "number",
    },
    { field: "price", headerName: "Price", minWidht: 270, flex: 0.5 },
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
                <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                    <EditIcon />
                </Link>
                <Button onClick={() => {
                    deleteProductHandler(params.getValue(params.id, "id"))}
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

  products &&
    products.forEach((item)=>{
        rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name,
        });
    });
  return (
  <Fragment>
    <MetaData title={`ALL PRODUCTS - Admin`} />
    <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
            <h1 id="productListHeading">All Products</h1>
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

export default ProductList;
