import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import "../styles/user-style.css"
import { MdEdit } from 'react-icons/md';
import { Form, Link } from 'react-router-dom';
import ava04 from "../assets/all-images/ava-2.jpg";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect,useRef  } from 'react';

import { Button, Input } from 'reactstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { colors } from '@mui/material';
import { enc, SHA256 } from 'crypto-js';
import AuthUser from '../components/AuthUser';
import img01 from "../assets/all-images/empty_person.png";



const UserProfile = () => {

  const [posts, setPosts] = useState([]);
  const [monyValue, setMonyValue] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const{http}= AuthUser();
  const[id,setID]= useState([]);
  const navigate = useNavigate();


  useEffect(()=>{
    http.post('/me').then((res)=>{
      setPosts(res.data)
    })
  },[]);
  console.log(posts.image)
  const AddToBalance=()=>{

    http.get("/MoveToBalance/"+posts.id+"/"+monyValue)
    setIsOpen(false); // Close the popup
  }

  const DeleteProfile=()=>{ 
      const url = "http://127.0.0.1:8000/api/deleteProfileCustomerSellerAPI"+"/"+posts.id
            fetch( url, { method: 'get'}).then((Response) => {
              if(!Response.ok){
                throw new Error('Something went wrong')
              }
              else{
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                navigate('/home');
              }
              console.log('cool');
            });
  }

    const EditProfile=()=>{
      navigate('/EditProfile')
    }

  

    // useEffect(() => {

      console.log(posts)
    // }, [])

    var isSeller = posts.utype ==='2';


    const sendDataToApi = (formData) => {
      fetch('http://127.0.0.1:8000/api/post-registration?name='+formData.name+"&email="+formData.email+"&phone="+formData.phone+"&address="+formData.address+"&password="+formData.password+"&utype="+formData.utype+"&image="+formData.image,{
      method:'POST',  
      headers:{
          'Content-Type': 'application/x-www-form-urlencoded',

        }
      })
        .then((response) => response.json())
        .catch((error) => console.log(error));
      };
      let closePopup; 
      const BecomeASeller = () => {
        const formData = {
          name:posts.name,
          email: posts.email,
          phone: posts.phone,
          address: posts.address,
          utype: 2,
          image:posts.image,
          password: 0,
        };
        sendDataToApi(formData);
        closePopup();
      };


  return (
    <section className="vh-100" >
      <MDBContainer >
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="10" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="12" className="gradient-custom text-center text-white">
                  <img src={`http://localhost:8000/${posts.image}`  }
                    alt="zbibi pic" className="my-5" style={{ width: '300px' }}  />
                  <MDBTypography tag="h5" >{posts.name}</MDBTypography>
                  <MDBTypography tag="h6" style={{ color:'white' }} >Balance:${posts.financial_balance}.00</MDBTypography>
                  <MDBTypography tag="h6" style={{ color:'white' }} >Profit:${posts.profits}.00</MDBTypography>
                </MDBCol>
                <MDBCol md="12">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr />
                    <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">{posts.id}</MDBTypography>
                        <MDBCardText className="text-muted"> ID</MDBCardText>
                      </MDBCol>

                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">{posts.email}</MDBTypography>
                        <MDBCardText className="text-muted"> email</MDBCardText>
                      </MDBCol>

                    </MDBRow>

                    <MDBTypography tag="h6">Accommodation</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Address</MDBTypography>
                        <MDBCardText className="text-muted">{posts.address}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">{posts.phone}</MDBCardText>
                      </MDBCol>

                    </MDBRow>
                    <MDBRow className="pt-1">
                      
                      
                    <MDBCol size="6" className="mb-3">
                    <Popup
                      trigger={<Button style={{ backgroundColor:'#911' }} >Delete Profile</Button>}
                      position="center center"
                      modal
                      closeOnDocumentClick
                      contentStyle={{ maxWidth: '400px', padding: '2rem' }}
                    >
                      {close => (
                        <div>
                          <p>Are you sure?</p>
                          <div>
                            <Button style={{ marginRight: '10px',backgroundColor:'#911' }} onClick={DeleteProfile}>Yes</Button>
                            <Button onClick={close}>No</Button>
                          </div>
                        </div>
                      )}
                    </Popup>
                    
                  </MDBCol>


                      <MDBCol size="6" className="mb-3">
                      <Button style={{ backgroundColor:'#090' }} onClick={EditProfile} >Edit Profile </Button>



                    </MDBCol>

                    {
                      isSeller ===true &&
                      <MDBCol size="6" className="mb-3">
                      <Popup
                        trigger={<Button onClick={() => setIsOpen(true)}>Add To balance</Button>}
                        position="center center"
                        modal
                        closeOnDocumentClick
                        contentStyle={{ maxWidth: '400px', padding: '2rem' }}
                        open={isOpen}
                        onClose={() => setIsOpen(false)} // Use a callback function
                      >
                        {(close) => { // Receive the close function as a parameter
                          const handleYesClick = () => {
                            AddToBalance();
                            close(); // Invoke the close function to close the popup
                          };

                          return (
                            <div>
                              <p>Are you sure you want to move your profits to your balance?</p>

                              <div>
                                <Input
                                  type='text'
                                  name='mony'
                                  placeholder='mony'
                                  value={monyValue}
                                  onChange={event => setMonyValue(event.target.value)}
                                />
                                <Button
                                  style={{ marginRight: '10px', backgroundColor: '#911' }}
                                  onClick={handleYesClick} // Use the handleYesClick function
                                >
                                  Yes
                                </Button>

                                <Button onClick={close}>No</Button>
                              </div>
                            </div>
                          );
                        }}
                      </Popup>;
                      </MDBCol>

                    }
                    {isSeller===false &&
                    <MDBCol size="6" className="mb-3">
                    <Popup
                      trigger={<Button>Become A Seller</Button>}
                      position="center center"
                      modal
                      closeOnDocumentClick
                      contentStyle={{ maxWidth: '400px', padding: '2rem' }}
                    >
                      {(close) => {
                        closePopup = close; // Assign the close function to closePopup variable

                        return (
                          <div>
                            <p>Are you sure you want to become a seller?</p>
                            <div>
                              <Button
                                style={{ marginRight: '10px', backgroundColor: '#911' }}
                              onClick={BecomeASeller}>
                                Yes
                              </Button>
                              <Button onClick={close}>No</Button>
                            </div>
                          </div>
                        );
                      }}
                    </Popup>
                    </MDBCol>

                    }
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

    </section>
  );
}

export default UserProfile;
        