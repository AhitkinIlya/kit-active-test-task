import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { connect } from 'react-redux'

//Защищенный роут компонент
const PrivateRoute = ({ auth: { isAuthenticated } }) => {
  //Если пользователь не авторизирован, то перекинет на форму логина
  return (isAuthenticated ? <Outlet /> : <Navigate to="/login" replace={true} /> )

}

const mapStateToProps = state => ({
    auth: state.auth
})
  
export default connect(mapStateToProps)(PrivateRoute)