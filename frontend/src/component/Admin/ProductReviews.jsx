import React, { Fragment, useEffect, useState } from "react";
import "./ProductReviews.css";
import { DataGrid } from "@material-ui/data-grid";
import MetaData from "../layout/MetaData";
import Star from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {  useNavigate } from "react-router-dom";
import { clearErrors, getAllReviews, deleteReviews } from "../../actions/productAction";
import { Button } from "@material-ui/core";
import {  DELETE_REVIEW_RESET } from "../../constants/productConstant";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();

  const {  error: deleteError, isDeleted} = useSelector((state) => state.review);

  const { error, reviews, loading } = useSelector((state) => state.productReviews);

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  }

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if(productId.length === 24) {
        dispatch(getAllReviews(productId));
    }
    if(error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    if(deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
    }

    if(isDeleted === true) {
        alert.success("Review Deleted Successfully");
        history("/admin/reviews");
        dispatch({type: DELETE_REVIEW_RESET});
    }
    // dispatch(getAdminProducts());
  }, [dispatch, alert, error, deleteError, history, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidht: 200, flex: 0.5 },
    {
        field: "user",
        headerName: "User",
        minWidht: 200,
        flex: 0.5,
      },
    { field: "comment", headerName: "Comment", minWidht: 350, flex: 1 },
    { field: "rating", headerName: "Rating", minWidht: 180, flex: 0.4, type: "number",
    cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3 ? "greenColor" : "redColor";
    }
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
                <Button onClick={() => {
                    deleteReviewHandler(params.getValue(params.id, "id"))}
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

  reviews &&
    reviews.forEach((item)=>{
        rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name,
        });
    });
  return (
  <Fragment>
    <MetaData title={`ALL REVIEWS - Admin`} />
    <div className="dashboard">
        <Sidebar />
        <div className="productReviewContainer">
        <form
                        className='productReviewsForm'
                        onSubmit={productReviewSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">All Reviews</h1>

                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder='Product Id'
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)} 
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type='submit'
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Search
                        </Button>
                    </form>
                    {reviews && reviews.length > 0 ? (<DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
    </div>
  </Fragment>);
};

export default ProductReviews;