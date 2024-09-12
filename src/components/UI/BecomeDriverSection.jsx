import React from "react";
import "../../styles/become-driver.css";
import { Container, Row, Col } from "reactstrap";

import driverImg from "../../assets/all-images/toyota-offer-2.png";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Button } from 'reactstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { enc, SHA256 } from 'crypto-js';
import AuthUser from "../AuthUser";
const BecomeDriverSection = () => {
  const{http}= AuthUser();
  const [posts, setPosts] = useState([])
  const navigate = useNavigate();
  const goTologin =()=>{
    navigate('/login')    
  } 
  useEffect(()=>{
    http.post('/me').then((res)=>{
      setPosts(res.data)
    })
  },[]);
  console.log("become::"+posts.name)
  const sendDataToApi = (formData) => {
    fetch('http://127.0.0.1:8000/api/post-registration?name='+formData.name+"&email="+formData.email+"&phone="+formData.phone+"&address="+formData.address+"&password="+formData.password+"&utype="+formData.utype+"&image="+formData.image,{
      method:'POST'
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    console.log(formData.utype)
    };
  const BecomeASeller = ()=>{
    
    const formData = {
      name:posts.name,
      email:posts.email,
      phone:posts.phone,
      address:posts.address,
      image:posts.image,
      utype:2,
      password:0,
    };
    sendDataToApi(formData);
  }
  const isSeller = posts.utype==='2';
  
  console.log("isLLL:"+isSeller)
  if(sessionStorage.getItem('token') === null)
  return (
    <section className="become__driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__driver-img">
            <img src={driverImg} alt="" className="w-100" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="section__title become__driver-title">
              Do You Want to Earn With Us? So Don't Be Late
            </h2>

            <button onClick={goTologin} className="btn become__driver-btn mt-4">
              Become a Seller
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );

  else if(isSeller===false){
    return(
      <section className="become__driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__driver-img">
            <img src={driverImg} alt="" className="w-100" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="section__title become__driver-title">
              Do You Want to Earn With Us? So Don't Be Late
            </h2>

            <Popup
                      trigger={<button className="btn become__driver-btn mt-4">
                      Become a Seller
                    </button>}
                      position="center center"
                      modal
                      closeOnDocumentClick
                      contentStyle={{ maxWidth: '400px', padding: '2rem' }}
                    >
                      {close => (
                        <div>
                          <p>Are you sure?</p>
                          <div>
                            <Button style={{ marginRight: '10px',backgroundColor:'#911' }} onClick= {() => BecomeASeller(close)}>Yes</Button>
                            <Button onClick={close}>No</Button>
                          </div>
                        </div>
                      )}
              </Popup>

          </Col>
        </Row>
      </Container>
    </section> 
    );
  }

}

export default BecomeDriverSection;
