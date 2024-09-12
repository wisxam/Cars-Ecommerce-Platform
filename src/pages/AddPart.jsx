import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import * as yup from "yup";
import { Form, FormGroup,Container,Row,Col, Input } from "reactstrap";

import useMediaQuery from "@mui/material/useMediaQuery"; //so i can have responsive layout
import React, { Component } from "react";
import { useState, useEffect } from "react";
import { MdWidthFull } from "react-icons/md";
import AuthUser from "../components/AuthUser";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/form.css";
import { useNavigate } from 'react-router-dom';
import "../styles/message.css";


const initialValues = { 
        model_id: "dsdsdds",
        category_id:""
    };

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/; //js thing where i can check based on the string and i can check what the values are (copied from stackoverflow)

const userSchema = yup.object().shape({ //this schema will define the validation logic for each field that will be used, and yup provides many validation functions
    name: yup.string().required("required"), //if there is no input this firstName field is going to be a required input
 
});
const AddPart = () => {
  const navigate = useNavigate();

  const{http}= AuthUser();

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    const [category, setcategory] = useState([]);
    const [modelId, setModelId] = useState(initialValues.model_id);
    const [categoryId, setCategoryId] = useState(initialValues.category_id);
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

    useState(() => {
      fetch("http://127.0.0.1:8000/api/Models")
        .then((data) => data.json())
        .then((data) => setPosts(data)); // Slice the data array to contain only the first 4 items
    }, []);
    useState(() => {
      fetch("http://127.0.0.1:8000/api/category")
        .then((data) => data.json())
        .then((data) => setcategory(data)); // Slice the data array to contain only the first 4 items
    }, []);

    // fetch("http://127.0.0.1:8000/api/savepart?name="+formData.name+"&seller_id"+formData.seller_id+"&model_id"+formData.model_id+"&category_id="+formData.category_id+"&amount="+formData.amount+"&price="+formData.price+"&description="+formData.description)
    
  
    
    const sendDataToApi = (formData) => {
    
        fetch("http://127.0.0.1:8000/api/savepart",{
          method: "post",
          body: formData,
        })
          .then((response) => response.json())
          .catch((error) => console.log(error))
            .then((data) => {
    
              displayResponse(data);
            })
        };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append("seller_id", user.id);
        formData.append("name", event.target.elements.name.value);
        formData.append("model_id", event.target.elements.model_id.value);
        formData.append("category_id", event.target.elements.category_id.value);
        formData.append("amount", event.target.elements.amount.value);
        formData.append("price", event.target.elements.price.value);
        formData.append("description", event.target.elements.description.value);
        formData.append("image", event.target.elements.image.files[0]);
        sendDataToApi(formData);
        event.target.reset();
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
        <h1 style={{ textAlign:'center' }} >Add Part</h1>
            <Form onSubmit={handleSubmit} className="login-form">
            <TextField required className="textField-group" variant="filled" type="text" label="Name" name="name" placeholder="Part Name" /> <br/>
                            <TextField required className="textField-group" variant="filled" type="number" label="Amount" name="amount" placeholder="Add Amount"/><br/>
                            <TextField required  className="textField-group" variant="filled" type="number" label="Price" name="price" placeholder="Add Price"/><br/>
                            <TextField required className="textField-group" variant="filled" type="text" label="Description" name="description" placeholder="Add Description"/><br/>
                            Image:<TextField required  type="file" name="image" /><br/>
                             
                            <Select required className="select-group" label="model" name="model_id"   value={modelId} onChange={(e) => setModelId(e.target.value)} >
                              <MenuItem key="default">Select Model</MenuItem>
                              {posts.map((data) => (
                                <MenuItem key={data.id} value={data.id}>
                                  {data.model}
                                </MenuItem>
                              ))}
                            </Select>

                            <Select required className="select-group" label="model" name="category_id" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                              <MenuItem  >Select Category</MenuItem>
                              {category.map((data) => (
                                <MenuItem key={data.id} value={data.id}>
                                  {data.name}
                                </MenuItem>
                              ))}
                            </Select>


                            <br/>
                            <br/>
                            <Button type="submit" color="secondary" variant="contained">
                                Save Part
                            </Button>
            </Form>
        </Box>
        </div>
    )
} 

export default AddPart;
