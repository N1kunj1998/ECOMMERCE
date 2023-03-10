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
import { Button } from "@material-ui/core";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
        alert.success(message);
        history("/admin/users");
        dispatch({type: DELETE_USER_RESET});
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidht: 180, flex: 0.8 },
    { field: "email", headerName: "Email", minWidht: 200, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidht: 150,
      flex: 0.5,
    },
    { field: "role", headerName: "Role", minWidht: 150, flex: 0.3,
        cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
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
                <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                    <EditIcon />
                </Link>
                <Button onClick={() => {
                    deleteUserHandler(params.getValue(params.id, "id"))}
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

  users &&
    users.forEach((item)=>{
        rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
        });
    });
  return (
  <Fragment>
    <MetaData title={`ALL Users - Admin`} />
    <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
            <h1 id="productListHeading">All Users</h1>
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

export default UsersList