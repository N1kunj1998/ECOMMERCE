import React from 'react'
import { useSelector } from 'react-redux';
import {  Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {loading, isAuthenticated, user } = useSelector((state) => state.user);
    if(!loading && !isAuthenticated) {
            return <Navigate to="/login" />
    } 
    return children;
}

export default ProtectedRoute