import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import * as yup from "yup";
import { Form, FormGroup, Input } from "reactstrap";

import useMediaQuery from "@mui/material/useMediaQuery"; //so i can have responsive layout
import React, { Component } from "react";
import { useState, useEffect } from "react";
import { MdWidthFull } from "react-icons/md";
import AuthUser from "../components/AuthUser";
import "../styles/form.css";
import "../styles/message.css";




const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/; //js thing where i can check based on the string and i can check what the values are (copied from stackoverflow)

const userSchema = yup.object().shape({ //this schema will define the validation logic for each field that will be used, and yup provides many validation functions
    name: yup.string().required("required"), //if there is no input this firstName field is going to be a required input
 
});
const ProposeCategory = () => {

  const{http}= AuthUser();
  const [user, setUser] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  useState(() => {
    http.post('/me')
    .then((res)=>{setUser(res.data)})
  } , []);

  
    const isNonMobile = useMediaQuery("(min-width:600px)"); //if the width is less than 600px then it will trigger the isNonMobile which is a boolean
    
    const sendDataToApi = (formData) => {
        fetch("http://127.0.0.1:8000/api/saveproposecategory?name="+formData.name+"&seller_id="+formData.seller_id+"&description="+formData.description)
          .then((response) => response.json())
          .catch((error) => console.log(error))
          .then((data) => {
            displayResponse(data);
          })

        };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
          seller_id: user.id ,
          name: event.target.elements.name.value,
          description: event.target.elements.description.value,
        };
        sendDataToApi(formData);
        
        event.target.elements.description.value="";
        event.target.elements.name.value="";
      };
      const displayResponse = (data) => {
        setMessage(data);
        setMessageType("success");
        setShowMessage(true);
      };
    
      const handleClickOutsideMessage = (event) => {
        if (!event.target.closest(".message")) {
          setShowMessage(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener("click", handleClickOutsideMessage);
        return () => {
          document.removeEventListener("click", handleClickOutsideMessage);
        };
      }, []);

    return(
      <div className="form-container">
        {showMessage && (
        <div className={`message ${messageType}`}>
          <p>{message}</p>
          <span className="close-button" onClick={handleCloseMessage}>
            X
          </span>
          </div>
          )} 
        <Box m="20px" >
        <h1 style={{ textAlign:'center' }} >Propose Category</h1>
            <Form onSubmit={handleSubmit} className="login-form" >
                            <TextField required className="textField-group" variant="filled" type="text" label="Name" name="name" placeholder="Part Name" /> <br/>
                            <TextField required className="textField-group"  variant="filled" type="Description" label="Description" name="description" placeholder="Add Description"/><br/>
                            <br/>
                            <Button type="submit" color="secondary" variant="contained">
                                Save 
                            </Button>
            </Form>
        </Box>
        </div>
    )
} 

export default ProposeCategory;
