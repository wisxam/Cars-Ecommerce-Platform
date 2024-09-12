  import React from "react";
  import { Container, Row, Col, Form, FormGroup, Input,Button } from "reactstrap";
  import Helmet from "../components/Helmet/Helmet";
  import CommonSection from "../components/UI/CommonSection";
  import PartItem from "../components/UI/PartItem";
  import { Link } from "react-router-dom";
  import { useState, useEffect } from "react";
  import { useNavigate } from 'react-router-dom';
  import AuthUser from "../components/AuthUser";
  import carData from "../assets/data/partData";
  
  import img01 from "../assets/all-images/parts-img/bmw-engine.png";



import "../styles/message.css";




  const PartListing = () => {

    const{http}= AuthUser();
    const [user, setUser] = useState([]);
    useState(() => {
      http.post('/me')
      .then((res)=>{setUser(res.data)})
    } , []);

    const navigate = useNavigate();


    // select dynamic quary 
    const [carTypes, setCarTypes] = useState([]);
    const [carModels, setCarModels] = useState([]);
    const [carParts, setCarParts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const [searchName, setSearchName] = useState("");
    const [searchModel, setSearchModel] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchResults, setSearchResults] = useState([]);


    const handleCloseMessage = () => {
      setShowMessage(false);
    };
  
    const handleSearch=()=>{}

    useEffect(() => {
      fetch("http://127.0.0.1:8000/api/carType")
        .then((response) => response.json())
        .then((data) => setCarTypes(data))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
      fetch("http://127.0.0.1:8000/api/partCategories")
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.log(error));
    }, []);
    
    useEffect(() => {
        fetch(
          `http://127.0.0.1:8000/api/carParts?model=${selectedModel}&category=${selectedCategory}&carType=${selectedType}`
        )
          .then((response) => response.json())
          .then((data) => setCarParts(data))
          .catch((error) => console.log(error));
    }, [selectedType,selectedModel, selectedCategory]);

    const handleTypeChange = (event) => {
      const selectedType = event.target.value;
      setSelectedType(selectedType);
      setSelectedModel("");
      setCarModels([]); 

      if (selectedType) {
        fetch(`http://127.0.0.1:8000/api/carModel?type=${selectedType}`)
          .then((response) => response.json())
          .then((data) => setCarModels(data))
          .catch((error) => console.log(error));
      }
    };

    const handleModelChange = (event) => {
      const selectedModel = event.target.value;
      setSelectedModel(selectedModel);
    };
    const handleCategoryChange = (event) => {
      const selectedCategory = event.target.value;
      setSelectedCategory(selectedCategory);
    };
    var [posts, setPosts] = useState([]);
    useState(() => {
      fetch("http://127.0.0.1:8000/api/carParts")
        .then((data) => data.json())
        .then((data) => setPosts(data)); 
    }, []);

    
    if(carParts.length!=0){
      posts=carParts
    }

    const sendDataToApi = (formData) => {
      console.log(formData);
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
          console.log(data)

          displayResponse(data);
        })
        .catch((error) => {
          console.error(error);
        });
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


    const handleSubmit = (event) => {
      event.preventDefault();

      const formData = {
        part_id: event.target.elements.part_id.value,
        customer_id: event.target.elements.customer_id.value,
        amount: event.target.elements.amount.value,
      };
      if(sessionStorage.getItem('token')){
        sendDataToApi(formData);
        event.target.reset();
        
      }

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



      


    return (
      <Helmet title="Parts">
        <CommonSection title="Parts" />
        <section>
        {posts?.[0]?.length ?
          <Container>
            <Row>
              <Col lg="3">
                <div className=" d-flex align-items-center gap-3 mb-5">
                  <span className=" d-flex align-items-center gap-2">
                    <i class="ri-sort-asc"></i> Category
                  </span>
                  <select onChange={handleCategoryChange} value={selectedCategory}>
              <option>Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
                </div>
              </Col>
              <Col lg="3">
                <div className=" d-flex align-items-center gap-3 mb-5">
                  <span className=" d-flex align-items-center gap-2">
                    <i class="ri-sort-asc"></i> Brand
                  </span>

                  <select onChange={handleTypeChange} >
                  <option >Select Type</option>
                  {carTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                  {type.type}
                  </option>
                  ))}
                </select>
                </div>
              </Col>

              <Col lg="3">
                <div className=" d-flex align-items-center gap-3 mb-5">
                  <span className=" d-flex align-items-center gap-2">
                    <i class="ri-sort-asc"></i> Model
                  </span>

                  <select onChange={handleModelChange} value={selectedModel} >
                  <option >Select Model</option>
                  {carModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.model}
                    </option>
                  ))}
                </select>
                </div>
              </Col>
            <>
            {showMessage && (
        <div className={`message ${messageType}`}>
          <p>{message}</p>
          <span className="close-button" onClick={handleCloseMessage}>
            X
          </span>
          </div>
          )}      

          
          {posts?.map((part1) => (part1.map((part)=>

          <Col lg="4" md="4" sm="6" className="mb-5">

            <div className="car__item">
              <div ><img src={`http://localhost:8000/${part.image}`} alt={part.image} style={{ width:'380px',height:'250px' }} /></div>

              <div className="car__item-content mt-4">
                <h3 className="section__title text-center">{part.name}</h3>

                <p className="rent__price text-center mt-">
                  ${part.price}.00
                </p> 
                <h6 className="d-flex align-items-center gap-1">
                  {part.type}({part.model_id})
                </h6>

                <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
    

                  <span className=" d-flex align-items-center gap-1">
                    <i className="">Category:</i> {part.category.name}
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
                <div style={{ display: 'flex' }}>
                <Form onSubmit={handleDetails}>
                  <Input type="hidden" name="part_id" value={part.id} />
                  <button  type="submit" className="btn"  style={{ backgroundColor:'orange' }}>
                    Details
                  </button>
                </Form>
                <Form onSubmit={report}>
                  <Input type="hidden" name="part_id" value={part.id} />
                  <Input type="hidden" name="seller_id" value={part.seller_id}  />
                  <button className="btn" style={{ backgroundColor:'orange' }} type="submit">
                    Report
                  </button>
                </Form>
              </div>


              </div>

            </div>
          </Col>
          )))}
        </>
        </Row>
        <div id="responseContainer"></div>
                <script src="script.js"></script>

          </Container>
        :null}

        </section>
      </Helmet>
    );
  };

  export default PartListing;
