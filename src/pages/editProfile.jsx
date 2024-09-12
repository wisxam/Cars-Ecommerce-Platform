import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import "../styles/user-style.css"
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ava04 from "../assets/all-images/ava-2.jpg";
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import AuthUser from '../components/AuthUser';
import img01 from "../assets/all-images/empty_person.png";

import "../styles/message.css";


const EditProfile = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const{http}= AuthUser();
  const [user, setUser] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    http.post('/me')
    .then((res)=>{setPosts(res.data)})
  } , []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  console.log("edit"+user.id)
  console.log("sss"+posts.image)


  
  // useState(() => {
  
  //     fetch("http://127.0.0.1:8000/api/showProfile"+"/"+user.id)
  //     .then((data) => data.json())
  //     .then((data) => setPosts(data))
      
  //   })

    // const sendDataToApi = (formData) => {
    //     if(selectedImage){
    //       formData.image=selectedImage
    //     }
    //     console.log(formData)

    //     fetch("http://127.0.0.1:8000/api/updateProfile",{
    //       method:'post',
    //       headers: { 'Content-Type': 'application/json' },
    //       body:JSON.stringify({
    //         'id':formData.id,
    //         'name':formData.name,
    //         'email':formData.email,
    //         'password':formData.password,
    //         'address':formData.address,
    //         'phone':formData.phone,
    //         'financial_balance':formData.financial_balance,
    //         'image':formData.image
    //       })

    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setPosts(data);            
    //         // navigate('/userProfile');
    //       })
    //       .catch((error) => console.log(error));
    //     };
    const sendDataToApi = (formData) => {
      const data = new FormData();
      data.append('id', formData.id);
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('address', formData.address);
      data.append('phone', formData.phone);
      data.append('financial_balance', formData.financial_balance);
      if (selectedImage) {
        data.append('image', selectedImage);
      }
      else
        data.append('image',formData.image)
    
      fetch("http://127.0.0.1:8000/api/updateProfile", {
        method: 'post',
        body: data
      })
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          navigate('/userProfile');
        })
        .catch((error) => console.log(error));
    };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if(event.target.elements.name.value){
            event.target.elements.name.value=event.target.elements.name.value
        }
        else{
            event.target.elements.name.value=posts.name
        }
        if(event.target.elements.email.value){
            event.target.elements.email.value=event.target.elements.email.value
        }
        else{
            event.target.elements.email.value=posts.email
        }
        if(event.target.elements.address.value){
            event.target.elements.address.value=event.target.elements.address.value
        }
        else{
            event.target.elements.address.value=posts.address
        }
        if(event.target.elements.phone.value){
            event.target.elements.phone.value=event.target.elements.phone.value
        }
        else{
            event.target.elements.phone.value=posts.phone
        }
        if(event.target.elements.password.value){
            event.target.elements.password.value=event.target.elements.password.value
        }
        else{
            event.target.elements.password.value=posts.password
        }
        if(event.target.elements.id.value){
            event.target.elements.id.value=event.target.elements.id.value
        }
        else{
            event.target.elements.id.value=posts.id
        }
        if(event.target.elements.financial_balance.value){
          event.target.elements.financial_balance.value=event.target.elements.financial_balance.value
        }
        else{
          event.target.elements.financial_balance.value=posts.financial_balance
        }
          const formData = {
          id: event.target.elements.id.value,
          name: event.target.elements.name.value,
          email: event.target.elements.email.value,
          password: event.target.elements.password.value,
          address: event.target.elements.address.value,
          phone: event.target.elements.phone.value, 
          financial_balance:event.target.elements.financial_balance.value,
          image:posts.image

        };

      if (window.confirm("Are you sure you want to edit?")) {
        sendDataToApi(formData);
      }
      else{
        event.target.reset();
      }
      event.target.reset();


      };



      
  return (
    <section className="vh-100" >

        <Form onSubmit={handleSubmit}>
      <MDBContainer >
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="10" className="mb-4 mb-lg-0">
            <MDBCard className="mb-4" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="12" className="gradient-custom text-center text-white"
                  style={{ backgroundColor : 'yellow' ,borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>

                  <MDBCardImage src={`http://localhost:8000/${posts.image}`} alt="zbibi dog pic" className="my-5" style={{ width: '300px' }} fluid />
                  <Input className='btn' type='file' name='image' style={{ backgroundColor:'orange',width:'500px' }} onChange={handleImageChange} />
                  <MDBTypography tag="h5">{posts.name}</MDBTypography>

                </MDBCol>
                <MDBCol md="12">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr />

                    <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                        <Input type='hidden' name='id' />
                        Pre.{posts.name}<Input type='text' name='name' />                        
                    <MDBCardText className="text-muted">Name</MDBCardText>

                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                    Pre.{posts.email}<Input type="email" name='email' />
                        <MDBCardText className="text-muted"> email</MDBCardText>
                    </MDBCol>


                    </MDBRow>

                    <MDBTypography tag="h6">Accommodation</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Address</MDBTypography>
                        Pre.{posts.address}<Input type='text' name='address'/>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        Pre.{posts.phone}<Input type='text'  name='phone'/>                        
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-4">
            
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Financial Balance</MDBTypography>
                        Pre.{posts.financial_balance}<Input type='text' name='financial_balance'/>                        
                    </MDBCol>

                    <MDBCol size="6" className="mb-3">
                    <MDBTypography tag="h6">New Password</MDBTypography><br/>
                    <Input type='password' name='password'/>
                    </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-4">
                      <MDBCol size="6" className="mb-3">
                      <button className=" contact__btn" type="submit">
                        Save Profile
                     </button>
                      </MDBCol>
                    </MDBRow>
                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>

                  </MDBCardBody>

                </MDBCol>

              </MDBRow>
            
            </MDBCard>
            
          </MDBCol>
        </MDBRow>

      </MDBContainer>

      </Form>
    </section>
  );
}

export default EditProfile;
        