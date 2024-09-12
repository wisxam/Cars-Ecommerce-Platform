import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { Form, FormGroup, Input } from "reactstrap";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import AuthUser from "../components/AuthUser";
const Report = () => {


  const [posts, setPosts] = useState([]);
  const [data, setdata] = useState([]);

  const{http}= AuthUser();
  const [user, setUser] = useState([]);

  useState(() => {
    http.post('/me')
    .then((res)=>{setUser(res.data)})
  } , []);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/sellerPartName/"+localStorage.getItem('report_seller_id')+"/"+localStorage.getItem('report_part_id'))
      .then((data) => data.json())
      .then((data) => setPosts(data)
      ); // Slice the data array to contain only the first 4 items
  },[]);
  

    
    const sendDataToApi = (formData) => {
        fetch("http://127.0.0.1:8000/api/Addreport?part_id="+formData.part_id+"&seller_id="+formData.seller_id+"&description="+formData.description+"&customer_id="+user.id)
          .then((response) => response.json())
          .catch((error) => console.log(error))
        };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const formData = {
          seller_id: localStorage.getItem('report_seller_id'),
          part_id: localStorage.getItem('report_part_id'),
          customer_id: user.id,
          description: event.target.elements.description.value,
        };
        localStorage.removeItem('report_seller_id')
        localStorage.removeItem('report_part_id')
        sendDataToApi(formData);
      };
    return(
        <Box m="20px">
            <Form onSubmit={handleSubmit}>
                            <h4>Seller Name:  {posts.map((data)=>
                            data.seller_name)}</h4>
                            <h4>Part Name:  {posts.map((data)=>
                            data.part_name)}</h4>
                            <TextField required fullWidth variant="filled" type="Description" label="Description" name="description" placeholder="Add Description"/><br/>
                            <br/>
                            <Button type="submit" color="secondary" variant="contained">
                                Save 
                            </Button>
            </Form>

        </Box>
    )
} 

export default Report;
