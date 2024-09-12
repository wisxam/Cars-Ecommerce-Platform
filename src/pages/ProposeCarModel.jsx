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
const ProposeCarModel = () => {

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


  const [posts, setPosts] = useState([]);
    useState(() => {
      fetch("http://127.0.0.1:8000/api/Brands")
        .then((data) => data.json())
        .then((data) => setPosts(data)); // Slice the data array to contain only the first 4 items
    }, []);


    // fetch("http://127.0.0.1:8000/api/savepart?name="+formData.name+"&seller_id"+formData.seller_id+"&model_id"+formData.model_id+"&category_id="+formData.category_id+"&amount="+formData.amount+"&price="+formData.price+"&description="+formData.description)
    
  
    const isNonMobile = useMediaQuery("(min-width:600px)"); //if the width is less than 600px then it will trigger the isNonMobile which is a boolean
    
    const sendDataToApi = (formData) => {
        fetch("http://127.0.0.1:8000/api/recieveCarModel?model="+formData.model+"&seller_id="+formData.seller_id+"&type="+formData.type)
          .then((response) => response.json())
          .catch((error) => console.log(error))
          .then((data) => {
            displayResponse(data);
          })    
        };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const formData = {
          seller_id: user.id,
          model: event.target.elements.model.value,
          type: event.target.elements.type.value,
        };
        sendDataToApi(formData);
        event.target.elements.model.value="";


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
          
        <h1 style={{ textAlign:'center' }} >Propose Model</h1>
            <Form onSubmit={handleSubmit} className="login-form" >
                            <TextField required className="textField-group" variant="filled" type="text" label="Name" name="model" placeholder="Part Name" /> <br/>

                            <Select required className="select-group" label="model"  name="type"  >
                                <MenuItem key="default" >Select Brand</MenuItem>
                                {posts.map((data)=>
                                <MenuItem key={data.id} value={data.id} >{data.type}</MenuItem>
                                )}
                            </Select>

                            <br/>
                            <Button type="submit" color="secondary" variant="contained">
                                Save 
                            </Button>
            </Form>
        </Box>
        </div>
      )
} 

export default ProposeCarModel;
