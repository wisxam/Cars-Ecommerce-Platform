import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery"; //so i can have responsive layout
import React, { Component } from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const initialValues = { 
        name: "",
        email: "",
        phone: "",
        address: "",
        utype:"",
        password: "",
        passwordCheck: "",
};
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/; //js thing where i can check based on the string and i can check what the values are (copied from stackoverflow)

const userSchema = yup.object().shape({ //this schema will define the validation logic for each field that will be used, and yup provides many validation functions
    name: yup.string().required("required"), //if there is no input this firstName field is going to be a required input
    email: yup.string().required("required"), //if there is no input this firstName field is going to be a required input
    phone: yup.string().matches(phoneRegExp,"Phone Number Is Not Valid").required("required"),
    address: yup.string().required("required"), //if there is no input this firstName field is going to be a required input
    password: yup.string().matches(passwordRegExp, "Password Does Not Match Valid Requirements").required("required"),
    passwordCheck: yup.string().oneOf([yup.ref('password'), null], 'Password Must Match'),
});
const Register = () => {
      const navigate = useNavigate();

      const [posts, setPosts] = useState([]);
      const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    };

    const isNonMobile = useMediaQuery("(min-width:600px)"); //if the width is less than 600px then it will trigger the isNonMobile which is a boolean
    
    const handleFormSubmit = (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("address", values.address);
        formData.append("utype", values.utype);
        formData.append("password", values.password);
        // formData.append("financial_balance", values.financial_balance);
        formData.append("image", image);

    
        fetch("http://127.0.0.1:8000/api/post-registration", {
          method: "post",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            setPosts(data);
            navigate("/home");
          });
      };

return(
    <div className="form-container">

        <Box m="20px">

            <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}	
            >
                {/* all of these values errors touched etc, all of them come from this Formik component and this arrow function allow me to use these values inside my form component */}
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="login-form">
                        <Box 
                        display="grid" 
                        gap="30px" 
                        gridTemplateColumns="repeat(4, minnmax(0, 1fr))"
                        // gridTemplateColumns allows me to split the grid into 4 sections and each of the section is going to have a minimum of 0 and a max of 1fr which is a specific unit dedicated for grids only (fractional units) *means each coloumn can have the max of 1 fraction*
                        sx={{
                            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
                        }}
                        >
                            <TextField
                                variant="filled"
                                className="textField-group"
                                type="text"
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name} 
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2"}}
                             />

                            <TextField
                                
                                className="textField-group"
                                variant="filled"
                                type="email"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email} 
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2"}}
                             />

                            <TextField
                                
                                className="textField-group"
                                variant="filled"
                                type="number"
                                label="Phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                                name="phone"
                                error={!!touched.phone && !!errors.phone} 
                                helperText={touched.phone && errors.phone}
                                sx={{ gridColumn: "span 2"}}
                             />
                            <TextField
                                
                                className="textField-group"
                                variant="filled"
                                type="text"
                                label="Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address}
                                name="address"
                                error={!!touched.address && !!errors.address} 
                                helperText={touched.address && errors.address}
                                sx={{ gridColumn: "span 2"}}
                             />
                            Customer<input
                                type="radio"
                                label="User Type"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value='1'
                                name="utype"
                             />
                            Seller<input
                                type="radio"
                                label="User Type"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value="2"
                                name="utype"
                             />
                            {/* <TextField
                                
                                className="textField-group"
                                variant="filled"
                                type="number"
                                label="Financial Balance"
                                onBlur={handleBlur}//represent the function that changes depending on whether i touch it or not 
                                onChange={handleChange}//when i change the text
                                value={values.lastName}//it has to change the initial values which are empty strings 
                                name="financial_balance"//this needs to align with the particular value
                                error={!!touched.financial_balance && !!errors.financial_balance} //touched is when i press on a field and get out of it while doing nothing on it, so !!touched will force it to become boolean
                                helperText={touched.financial_balance && errors.financial_balance}
                                sx={{ gridColumn: "span 2"}}
                             /> */}
                            Image:<TextField
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                    sx={{ gridColumn: "span 2" }}
                                    />
                             <TextField
                                
                                className="textField-group"
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}//represent the function that changes depending on whether i touch it or not 
                                onChange={handleChange}//when i change the text
                                value={values.lastName}//it has to change the initial values which are empty strings 
                                name="password"//this needs to align with the particular value
                                error={!!touched.password && !!errors.password} //touched is when i press on a field and get out of it while doing nothing on it, so !!touched will force it to become boolean
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 2"}}
                             />
                              <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password Check"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.passwordCheck}
                                name="passwordCheck"
                                error={!!touched.passwordCheck && !!errors.passwordCheck} 
                                helperText={touched.passwordCheck && errors.passwordCheck}
                                sx={{ gridColumn: "span 2"}}
                             />


                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button 
                            type="submit" 
                            color="secondary" 
                            variant="contained"
                            >
                                Create New User
                            </Button>
                        </Box>
                    </form>
                )}
            {/* formik provides a number of premade values that come from the formik component itself */}
            </Formik>
        </Box>
        </div>
    )
} 

export default Register;
