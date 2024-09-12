import React from "react";
import { Container, Row, Col, Form, FormGroup, Input,Button } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import PartItem from "../components/UI/PartItem";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import AuthUser from "../components/AuthUser";
import "../styles/message.css";


const PartDetails = () => {

  const{http}= AuthUser();
  const [user, setUser] = useState([]);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");


  useState(() => {
    http.post('/me')
    .then((res)=>{setUser(res.data)})
  } , []);

  const navigate = useNavigate();

  var [posts, setPosts] = useState([]);
  useState(() => {
    fetch("http://127.0.0.1:8000/api/PartDetails/"+localStorage.getItem('part_id'))
      .then((data) => data.json())
      .then((data) => setPosts(data)); // Slice the data array to contain only the first 4 items
  }, []);

 

  const sendDataToApi = (formData) => {
    const url =
    "http://127.0.0.1:8000/api/AddToCart?" +
    "customer_id=" +
    formData.customer_id +
    "&part_id=" +
    formData.part_id +
    "&amount=" +
    formData.amount;

  fetch(url, { method: 'get' })
    .then((response) => {
      if (!response.ok) {
        
      }
      return response.json(); // Assuming the API response is in JSON format
    })
    .then((data) => {
      // Handle the successful response here
      console.log(data)

      displayResponse(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      part_id: event.target.elements.part_id.value,
      customer_id: event.target.elements.customer_id.value,
      amount: event.target.elements.amount.value,
    };
    if(sessionStorage.getItem('token'))
      sendDataToApi(formData);
    else
      navigate('/login');

    };

    const handleCloseMessage = () => {
      setShowMessage(false);
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

  return (
    
    <Helmet title="Parts Details">
      <CommonSection title="Parts Details" />

      <section>
        <Container>
          <>
          {showMessage && (
        <div className={`message ${messageType}`}>
          <p>{message}</p>
          <span className="close-button" onClick={handleCloseMessage}>
            X
          </span>
          </div>
          )} 

        {posts.map((part1) => (part1.map((part)=>
        
          <div className="car__item">
            
            <div ><img src={`http://localhost:8000/${part.image}`} style={{float:'right', width:'500px' }} /></div>

            <h3 className="section__title text-center">Name:{part.name}</h3>
            
            <div className="car__item-content mt-4">

              <div style={{ float:'center' }} >
 
              <h6 className="d-flex align-items-center gap-1">
                Car Brand :{part.type}
              </h6>
              <h6 className="d-flex align-items-center gap-1">
                Car Model :{part.model}
              </h6>
              <h6 className="d-flex align-items-center gap-1">
                Seller Name :{part.seller.name}
              </h6>
              <h6 className="d-flex align-items-center gap-1">
                Seller Email :{part.seller.email}
              </h6>
              <h6 className="d-flex align-items-center gap-1">
                Seller Address :{part.seller.address}
              </h6>

              <h6 className="d-flex align-items-center gap-1">
              Category Name :{part.category.name}
              </h6>
              <h6 className="d-flex align-items-center gap-1">
              Category Description  :{part.category.description}
              </h6>

              <h6 className="d-flex align-items-center gap-1">
              Created At :{part.created_at}
              </h6>
              <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
           


              <h6>
                <span className=" d-flex align-items-center gap-1">
                <i className="">Price:</i> {part.price}.00
                  <i className="">Amount:</i> {part.amount}.00
                </span>
              </h6>

              </div>
              </div>
              


              <Form onSubmit={handleSubmit}>
              <Input type="hidden" name="part_id" value={part.id} />
              <Input type="hidden" name="customer_id" value={user.id} />
              <Input type='number' placeholder="Amount" name="amount"   />
              <Input type="submit" name="submit" value="AddToCart" className="btn " />
              </Form>


                
            </div>

          </div>
         )))}
      </>

        </Container>
      </section>
    </Helmet>
  );
};

export default PartDetails;
