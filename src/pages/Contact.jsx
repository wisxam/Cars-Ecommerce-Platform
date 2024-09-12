import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";


const socialLinks = [
  {
    url: "https://www.facebook.com/profile.php?id=100009074204136",
    icon: "ri-facebook-line",
  },
  {
    url: "https://www.instagram.com/muhammadAlzabibi",
    icon: "ri-instagram-line",
  },

];




const Contact = () => {
  const sendDataToApi = (formData) => {
    console.log(formData)
    fetch("http://127.0.0.1:8000/api/SaveContactUs", {
      method: "post",
      headers: {
        'Accept':'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          // Handle successful API response
          console.log("Data sent successfully");
        } else {
          // Handle API error
          console.error("Failed to send data to API");
        }
      })
      .catch(error => {
        // Handle network error
        console.error("Failed to send data to API", error);
      });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      message: event.target.elements.message.value,
    };
  
    sendDataToApi(formData);
  };
  
  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text" name="name" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" name="email" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                  name="message"
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                  ></textarea>
                </FormGroup>

                <button className=" contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  Alabaseen, Damascus, Syria
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+963932392808</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">alzabibimuhammad@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i class={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
