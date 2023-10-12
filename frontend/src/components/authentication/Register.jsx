import { Button, FormControl, FormLabel, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import axios from 'axios'
import { useFormik } from "formik";
import * as yup from "yup";
import Loader from '../Loader';
import React from 'react'
import { useState } from 'react'

const Register = () => {
  const [show, setshow] = useState(false)
  const [pic, setpic] = useState("")
  const handleClick = () => setshow(!show)
  const [isLoading, setisLoading] = useState(false)

  const postDetails = (pics) => {
    
  }

  const onSubmit = (values) => {
    setisLoading(true)
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      pic: pic,
    }
    axios.post("http://localhost:5000/users/register", data)
    .then((res) => {
      console.log(res);
    }).catch((error)=>{
      console.log(error);
    }).finally(()=>{
      setisLoading(false)
    })
  }

  const emailValidate =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const { handleSubmit, handleChange, errors, touched, handleBlur, values } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: yup.object().shape({
        name: yup.string().required("This input field cannot be empty"),
        email: yup
          .string()
          .matches(emailValidate, "Must be a valid email")
          .required("Email field is required"),
        password: yup
          .string()
          .required("Password field cannot be empty")
          .min(6, "Password cannot be less than 6 characters"),
      }),
      onSubmit,
    });
  return (
    <>
    {isLoading ? (<Loader/>) : null}
      <VStack spacing={"5px"}>
        <FormControl id="firstname" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            placeholder="Enter Your Name"
          />
          {touched.name && errors.name && (
            <small className="text-red-600 font-bold">{errors.name}</small>
          )}
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            placeholder="Enter Your Email"
          />
          {touched.email && errors.email && (
            <small className="text-red-600 font-bold">{errors.email}</small>
          )}
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size={"md"}>
            <Input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
            />

            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="pic">
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>

        <Button
          colorScheme="orange"
          width={"100%"}
          style={{ marginTop: 15 }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </VStack>
    </>
  );
}

export default Register