import React from "react";
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();
  const Login=()=>{
    navigate('/Login')
  }

  return <div style={{ textAlign:'center' }}><br/><br/><h3  >You have to login</h3><br/><button onClick={Login} className="btn" style={{ backgroundColor:'orange' }} >Login</button><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>;
};

export default NotFound;
