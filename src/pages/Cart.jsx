import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { useNavigate } from 'react-router-dom';
import AuthUser from "../components/AuthUser";
import "../styles/message.css";



const Cart = () => {
  const { http } = AuthUser();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleCloseMessage = () => {
    setShowMessage(false);
  };
  useEffect(() => {
    http.post('/me')
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  },[]);

  useEffect(() => {
    localStorage.removeItem('part_id');
    http.get('/ShowCart/' + user.id)
      .then((res) => {
        setPosts(res.data);
        http.get('/finalPrice/' + user.id)
          .then((res) => setFinalPrice(res.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  });


  const sendDataToApi = (formData) => {
    const url = "http://127.0.0.1:8000/api/deletefromcart/" + formData.cart_id;
    fetch(url, { method: 'get' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        console.log('cool');
        // Remove the deleted item from the posts state
        setPosts(prevPosts => prevPosts.map(part1 => part1.filter(part => part.id !== formData.cart_id)));
      })
      .catch((error) => console.log(error));
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      cart_id: event.target.elements.cart_id.value,
    };
    sendDataToApi(formData);
  };

  const sendDataToBuy = (buyData) => {
    const url = "http://127.0.0.1:8000/api/buycart?id=" + buyData.id;
    fetch(url, { method: 'get' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        console.log('cool');
      })
      .catch((error) => console.log(error));
  };

  const handleBuy = (event) => {
    event.preventDefault();
    const buyData = {
      id: event.target.elements.id.value,
    };

    if (window.confirm("Are you sure you want to buy?")) {
      sendDataToBuy(buyData);
      setShowConfirmation(true);
    } else {
      setShowConfirmation(false);
    }
  };

  const sendDetailsToApi = (formDetails) => {
    localStorage.removeItem('part_id');
    localStorage.setItem('part_id', formDetails.part_id);
    navigate('/PartDetails');
  };

  const handleDetails = (event) => {
    event.preventDefault();
    const formDetails = {
      part_id: event.target.elements.part_id.value,
    };
    sendDetailsToApi(formDetails);
  };
  
  const DeleteAll=()=>{
    if (window.confirm("Are you sure you want to buy?")) {
      http.get('/DeleteAllCart/'+user.id).then((res) => {
        displayResponse(res);
        window.location.reload()
      })

    } else {
      setShowConfirmation(false);
    }


  }
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

  console.log(posts)
  return (

    <Helmet title="Cart">

      <CommonSection title="Cart" />

      <section>

        <Container>

          <Row>
          {showMessage && (
        <div className={`message ${messageType}`}>
          <p>{message}</p>
          <span className="close-button" onClick={handleCloseMessage}>
            X
          </span>
          </div>
          )}
            {posts.length > 0 &&
              posts.map((part1) =>
                part1.map((part) => (
                  <Col lg="4" md="4" sm="6" className="mb-5">
                    <div className="car__item">
                    <div className="car__img"><img src={`http://localhost:8000/${part.part.image}`} alt="ooo" className="w-100" /></div>

                      <div className="car__item-content mt-4">
                        <h3 className="section__title text-center">{part.part.name}</h3>
                        <p className="rent__price text-center mt-">
                          PricePerItem: ${part.price}.00
                        </p>
                        <p className="rent__price text-center mt-">
                          Amount: {part.amount}
                        </p>
                        <p className="rent__price text-center mt-">
                          Total: ${part.totalprice}.00
                        </p>

                        <h6 className="d-flex align-items-center gap-1">
                          Model: ({part.car_model})
                        </h6>

                        <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                          <span className="d-flex align-items-center gap-1">
                            <i className="">Category:</i> {part.category.name}
                          </span>

                          <span className="d-flex align-items-center gap-1">
                            <i>Seller:</i> {part.seller.name}
                          </span>
                        </div>
                        <div style={{ display: 'flex' }}>

                        <Form onSubmit={handleSubmit}>
                          <Input type="hidden" name="cart_id" value={part.id} />
                          <button className="btn" >Delete</button>
                        </Form>

                        <Form onSubmit={handleDetails}>
                          <Input type="hidden" name="part_id" value={part.part_id} />
                          <button className="btn" style={{ backgroundColor:'orange' }} type="submit">
                            Details
                          </button>
                        </Form>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))
              )}
          </Row>

          <h3>Final Price: ${finalPrice}.00</h3>

          <div style={{ display: 'flex' }}>
          <Form onSubmit={handleBuy}>
            <Input type="hidden" name="id" value={user.id} />
            <Input type="submit" name="buy" style={{ width:'600px' }} value="Buy" className="btn" />
          </Form>

          <button className="btn" style={{ width:'600px' }} onClick={DeleteAll} > Deleted All
                  
          </button>
        </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;
