import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import * as yup from "yup";
import { Form, FormGroup, Input } from "reactstrap";

import useMediaQuery from "@mui/material/useMediaQuery"; //so i can have responsive layout
import React, { Component } from "react";
import { useState, useEffect } from "react";
import { MdWidthFull } from "react-icons/md";
import AuthUser from "../components/AuthUser";
import "../styles/form.css";
import { useNavigate } from 'react-router-dom';
const initialValues = { 
        name: "",
        model_id: "",
        category_id:""
    };



const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/; //js thing where i can check based on the string and i can check what the values are (copied from stackoverflow)

const userSchema = yup.object().shape({ //this schema will define the validation logic for each field that will be used, and yup provides many validation functions
    name: yup.string().required("required"), //if there is no input this firstName field is going to be a required input
 
});
const EditPart = () => {

  const navigate = useNavigate();

  const{http}= AuthUser();
  const [user, setUser] = useState([]);

  useState(() => {
    http.post('/me')
    .then((res)=>{setUser(res.data)})
  } , []);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };




    
    const [posts, setPosts] = useState([]);
    useState(() => {
      fetch("http://127.0.0.1:8000/api/Models")
        .then((data) => data.json())
        .then((data) => setPosts(data)); // Slice the data array to contain only the first 4 items
    }, []);
    const [category, setcategory] = useState([]);
    useState(() => {
      fetch("http://127.0.0.1:8000/api/category")
        .then((data) => data.json())
        .then((data) => setcategory(data)); // Slice the data array to contain only the first 4 items
    }, []);

    const [parts, setPart] = useState([]);
    useState(() => {
      fetch("http://127.0.0.1:8000/api/editpart/"+localStorage.getItem('Edit_part_id'))
        .then((data) => data.json())
        .then((data) => setPart(data)); // Slice the data array to contain only the first 4 items
    }, []);
    console.log('parts'+parts.image);
    const sendDataToApi = (formData) => {
        const data = new FormData();
        data.append('part_id', formData.part_id);
        data.append('seller_id', formData.seller_id);
        data.append('name', formData.name);
        data.append('model_id', formData.model_id);
        data.append('category_id', formData.category_id);
        data.append('amount', formData.amount);
        data.append('price', formData.price);
        data.append('description', formData.description);

        if (selectedImage) {
          data.append('image', selectedImage);
        }

        fetch("http://127.0.0.1:8000/api/saveEditPart",{
          method:'post',
          body:data
        })
          .then((response) => response.json())
          .catch((error) => console.log(error));
          navigate('/SellerParts')

        console.log(formData)

        };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if(event.target.elements.name.value){
          event.target.elements.name.value=event.target.elements.name.value
        }
        else{
          event.target.elements.name.value=parts.map((data)=>data.name)
        }

        if(event.target.elements.model_id.value){
          event.target.elements.model_id.value=event.target.elements.model_id.value
        }
        else{
          event.target.elements.model_id.value=parts.map((data)=>data.model_id)
        }

        if(event.target.elements.category_id.value){
          event.target.elements.category_id.value=event.target.elements.category_id.value
        }
        else{
          event.target.elements.category_id.value=parts.map((data)=>data.category_id)
        }
        if(event.target.elements.amount.value){
          event.target.elements.amount.value=event.target.elements.amount.value
        }
        else{
          event.target.elements.amount.value=parts.map((data)=>data.amount)
        }
        if(event.target.elements.price.value){
          event.target.elements.price.value=event.target.elements.price.value
        }
        else{
          event.target.elements.price.value=parts.map((data)=>data.price)
        }
        if(event.target.elements.description.value){
          event.target.elements.description.value=event.target.elements.description.value
        }
        else{
          event.target.elements.description.value=parts.map((data)=>data.description)
        }

        const formData = {
          part_id:localStorage.getItem('Edit_part_id'),
          seller_id:user.id ,
          name: event.target.elements.name.value,
          model_id: event.target.elements.model_id.value,
          category_id: event.target.elements.category_id.value,
          amount: event.target.elements.amount.value,
          price: event.target.elements.price.value,
          description: event.target.elements.description.value,
          image:parts.map((data)=>data.image)
        };
        sendDataToApi(formData);
        event.target.reset();
      };
    return(
      <div className="form-container">
        <Box m="20px" >
        <h1 style={{ textAlign:'center' }} >Edit Part</h1>

            <Form onSubmit={handleSubmit} className="login-form" >
                          {parts.map((data)=>(
                          <>
                          <img src= {`http://localhost:8000/${data.image}`} style={{float:'none', width:'500px' }} /> <br/>
                          <br/>Edit image:<TextField type="file" name="image" onChange={handleImageChange} style={{ backgroundColor:'orange',width:'250px' }} /> <br/><br/>
                           Pre:{data.name}<TextField className="textField-group"  variant="filled" type="text" label="Name" name="name" /> <br/>
                           Pre:{data.amount}<TextField  className="textField-group" variant="filled" type="number" label="Amount" name="amount" /><br/>
                            Pre:{data.price}<TextField  className="textField-group" variant="filled" type="number" label="Price" name="price" /><br/>
                            Pre:{data.description}<TextField  className="textField-group" variant="filled" type="Description" label="Description" name="description"/><br/><br/>
                            Pre:{data.model_name}<Select    className="select-group" label="model"  name="model_id"  >
                                <MenuItem key="default" >Select Model</MenuItem>
                                {posts.map((data)=>
                                <MenuItem key={data.id} value={data.id} >{data.model}</MenuItem>
                                )}
                            </Select>
                            Pre:{data.category.name}<Select className="select-group" label="model" name="category_id">
                            <MenuItem key="default"> Select Category</MenuItem>
                            {category.map((data) => (
                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            ))}
                            </Select><br/>
                            <br/>
                            <Button type="submit" color="secondary" variant="contained">
                                Save Part
                            </Button>
                            </>
                          ))}
            </Form>
        </Box>
        </div>
    )
} 

export default EditPart;
