import React, { useState, useEffect } from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import { useNavigate } from 'react-router-dom';

const FindCarForm = () => {
  const [carTypes, setCarTypes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carParts, setCarParts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

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
    if (selectedModel) {
      fetch(
        `http://127.0.0.1:8000/api/carParts?model=${selectedModel}&category=${selectedCategory}`
      )
        .then((response) => response.json())
        .then((data) => setCarParts(data))
        .catch((error) => console.log(error));
    }
  }, [selectedModel, selectedCategory]);

  
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
  
  const searchPart=(formData)=>{
    localStorage.removeItem('search_part_carType')
    localStorage.removeItem('search_part_model')
    localStorage.removeItem('search_part_category')

    console.log(formData)
    if(formData.carType){
      localStorage.setItem('search_part_carType',formData.carType)
    }
    if(formData.category){
      localStorage.setItem('search_part_category',formData.category)
    }
    if(formData.model){
      localStorage.setItem('search_part_model',formData.model)
    }
    if(localStorage.getItem('search_part_carType') | localStorage.getItem('search_part_category') | localStorage.getItem('search_part_model')){
      navigate('/SearchPart')
    }

  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    
    const formData = {
      carType: event.target.elements.carType.value,
      model: event.target.elements.model.value,
      category:event.target.elements.category.value
    };
    searchPart(formData)

  }
  return (
    <Form className="form" onSubmit={handleSubmit} >
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="select__group">
          <select onChange={handleTypeChange} name="carType" >
            <option value="">Select Type</option>
            {carTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup className="select__group">
          <select name="model" onChange={handleModelChange} value={selectedModel}>
            <option value="">Select Model</option>
            {carModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.model}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup className="select__group">
          <select name="category" onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">Select Category</option>
            {categories.map((category) => (

              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
         </select>
        </FormGroup>
        
        {/* <FormGroup className="select__group">
          <select>
          <option value="">Select Part</option>

            {carParts.map((part) => (
              <option key={part.id} value={part.id}>
                {part.name}
              </option>
            ))}
          </select>
        </FormGroup> */}
        <FormGroup className="form__group">
          <button className="btn find__car-btn">Find Auto Part</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
