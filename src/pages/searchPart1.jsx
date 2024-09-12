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


const SearchPart1 = () => {
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleCloseMessage = () => {
    setShowMessage(false);
  };
  const{http}= AuthUser();
  const [user, setUser] = useState([]);

  useState(() => {
    http.post('/me')
    .then((res)=>{setUser(res.data)})
  } , []);

  

  var [posts, setPosts] = useState([]);
  useState(() => {
    fetch("http://127.0.0.1:8000/api/searchPartHeader?term="+sessionStorage.getItem('term'))
      .then((data) => data.json())
      .then((data) => setPosts(data)); // Slice the data array to contain only the first 4 items
  });

  const sendDataToApi = (formData) => {
    console.log(formData)
    const url = "http://127.0.0.1:8000/api/AddToCart?"+"customer_id="+formData.customer_id + "&part_id="+formData.part_id+"&amount="+formData.amount
    fetch( url, { method: 'get'})
    .then((Response) => {
      if(!Response.ok){
        throw new Error('Something went wrong')
      }
    }).then((data) => {
      displayResponse(data);
    })
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


    const sendDetailsToApi=(formDetails)=>{
      localStorage.setItem('part_id',formDetails.part_id)
      navigate('/PartDetails');

    } 
    const handleDetails=(event)=>{
      event.preventDefault();
      const formDetails = {
        part_id: event.target.elements.part_id.value,
      };
      sendDetailsToApi(formDetails);
    }
    
    const sendReportToApi=(formData)=>{
      localStorage.setItem('report_seller_id',formData.seller_id)
      localStorage.setItem('report_part_id',formData.part_id)
      navigate('/report')
    }

    const report=(event)=>{
      event.preventDefault();
      const formData = {
        part_id: event.target.elements.part_id.value,
        seller_id: event.target.elements.seller_id.value,
      };

      if(sessionStorage.getItem('token'))
        sendReportToApi(formData);
      else
      navigate('/login');

    }
    const displayResponse = (data) => {
      setMessage('dssdds');
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
    
    <Helmet title="Parts">
      <CommonSection title="Parts" />

      <section>
        <Container>
          <Row>
          <>
          {showMessage && (
        <div className={`message ${messageType}`}>
          <p>{message}</p>
          <span className="close-button" onClick={handleCloseMessage}>
            X
          </span>
          </div>
          )}  
        {posts.map((part) =>
        <Col lg="4" md="4" sm="6" className="mb-5">
          <div className="car__item">
            <div ><img src={`http://localhost:8000/${part.image}`} style={{ width:'380px',height:'250px' }} /></div>
            <div className="car__item-content mt-4">
              <h3 className="section__title text-center">{part.name}</h3>
              <p className="rent__price text-center mt-">
                ${part.price}.00
              </p> 
              <p className="d-flex align-items-center gap-1">
                {part.type}({part.model.model})
              </p>

              <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
   
                <span className=" d-flex align-items-center gap-1">
                  <i className="">Category:</i>{part.category.name}
                </span>

                <span className=" d-flex align-items-center gap-1">
                  <i className="">Amount:</i> {part.amount}
                </span>

                <span className=" d-flex align-items-center gap-1">
                  <i>Seller:</i> {part.seller.name}
                </span>

              </div>


              <Form onSubmit={handleSubmit}>
              <Input type="hidden" name="part_id" value={part.id} />
              <Input type="hidden" name="customer_id" value={user.id} />
              <Input type='number' placeholder="Amount" name="amount"   />
              <Input type="submit" name="submit" value="AddToCart" className="btn " />
              </Form>

              <div style={{ display:'flex' }} >
              <Form onSubmit={handleDetails}>
              <Input type="hidden" name="part_id" value={part.id}/>
              <button className=" btn" style={{ backgroundColor:'orange' }} type="submit">
                Details
              </button>
              </Form>

              <Form onSubmit={report}>
              <Input type="hidden" name="part_id" value={part.id}/>
              <Input type="hidden" name="seller_id" value={part.seller_id}/>

              <button className=" btn" style={{ backgroundColor:'orange' }} type="submit">
                Report
              </button>
              </Form>
              </div>
            </div>

          </div>
        </Col>
         )}
      </>
      </Row>

        </Container>
      </section>
    </Helmet>
  );
};

export default SearchPart1;
