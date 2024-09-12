import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import PartListing from "../pages/PartListing";
import PartDetails from "../pages/PartDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Register from "../pages/register";
import Login from "../pages/login";
import UserProfile from "../pages/userProfile";
import EditProfile from "../pages/editProfile";
import Cart from "../pages/Cart";
import Purchases from "../pages/Purchases";
import AddPart from "../pages/AddPart";
import SellerParts from "../pages/SellerParts";
import SellerDeletedParts from "../pages/SellerDeletedParts";
import ProposeCategory from "../pages/ProposeCategory";
import ProposeCarModel from "../pages/ProposeCarModel";
import ProposeCarType from "../pages/ProposeCarType";
import SalesForSeller from "../pages/SalesForSeller";
import EditPart from "../pages/editPart";
import SearchPart from "../pages/searchPart";
import SearchPart1 from "../pages/searchPart1";
import AuthUser from "../components/AuthUser";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpertSystem from "../pages/ExpertSystem";

import Report from "../pages/Report";
const Routers = () => {
  const navigate = useNavigate();

  const{http}= AuthUser();
  const [user, setUser] = useState([]);

  useState(() => {
    http.post('/me')
    .then((res)=>{setUser(res.data)})
  });

  const isLoggedIn = Boolean(sessionStorage.getItem('token'));

  const isSeller=user.utype==='2';

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/parts" element={<PartListing />} />

      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />}  />
      <Route path="/SearchPart" element={<SearchPart />}  />
      <Route path="/SearchPart1" element={<SearchPart1 />}  />
      <Route path="/PartDetails" element={<PartDetails />}  />
      <Route path="/expertSystem" element={< ExpertSystem />}/>
      

      
    {isLoggedIn===true &&      
      <Route path="/Purchases" element={<Purchases />}  />
    }
    
     {isLoggedIn === true && 
      <Route path="/Cart" element={<Cart />} />
    } 
            
            
    {isLoggedIn===true &&      
      <Route path="/userProfile" element={<UserProfile />}  />
    }
            
    {isLoggedIn===true &&      
      <Route path="/EditProfile" element={<EditProfile />}  />
    }
      { isSeller===true && 
        <Route path="/AddPart" element={<AddPart/>} />
      }
      { isSeller===true&& 
      <Route path="/ProposeCategory" element={<ProposeCategory />}  />
      }
      { isSeller===true && 
      <Route path="/ProposeCarModel" element={<ProposeCarModel />}  />
      }
      { isSeller===true && 
      <Route path="/ProposeCarType" element={<ProposeCarType />}  />
      }
      { isSeller===true && 
      <Route path="/SalesForSeller" element={<SalesForSeller />}  />
      }
      
      { isSeller===true && 
      <Route path="/EditPart" element={<EditPart />}  />
      }
      { isSeller===true && 
      <Route path="/ProposeCarType" element={<ProposeCarType />}  />
      }

      { isSeller===true && 
      <Route path="/SellerParts" element={<SellerParts />}  />

      }
      { isSeller===true && 
      <Route path="/SellerDeletedParts" element={<SellerDeletedParts />}  />

      }

      {
        localStorage.getItem('report_seller_id') &&
        <Route path="/report" element={<Report />}  />
      }
    </Routes>
  );
};

export default Routers;