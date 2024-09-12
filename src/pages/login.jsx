import React from 'react';

import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import AuthUser from '../components/AuthUser';

const Login = () => {

  const{http,setToken}= AuthUser();
  const sendDataToApi=(formData)=>{
    http.post('/login',{'email':formData.email,'password':formData.password,}).then((res)=>{
      setToken(res.data.user,res.data.access_token);
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };
    sendDataToApi(formData);
  };
  return (
    <Helmet title="">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Login</h6>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" name="email" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input type="password" name="password" placeholder="Password"/>
                </FormGroup>
                <button className=" contact__btn" type="submit">
                  Login
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};


export default Login;