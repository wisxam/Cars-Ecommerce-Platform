import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/part-item.css";

const PartItem = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/showparts")
      .then((data) => data.json())
      .then((data) => setPosts(data)); // Slice the data array to contain only the first 4 items
  }, []);

  return (
          
    <>
    {posts.map((part) => (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">{/* Add image source here */}</div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{}</h4>
          <h6 className="rent__price text-center mt-">
            ${part.price}.00
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {}
            </span>

            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {}
            </span>
          </div>

          <button className=" w-50 car__item-btn car__btn-rent">
            <Link to="#">Buy</Link>
          </button>

          <button className=" w-50 car__item-btn car__btn-details">
            <Link to="#">Details</Link>
          </button>
        </div>
      </div>
    </Col>
     ))}
</>
  );
};

export default PartItem;
