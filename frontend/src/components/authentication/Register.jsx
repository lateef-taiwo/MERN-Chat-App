import { Button, FormControl, FormLabel, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

const Register = () => {
  const [show, setshow] = useState(false)
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("")
  const [pic, setpic] = useState("")
  const handleClick = () => setshow(!show)

  const postDetails = (pics) => {
    
  }

  const submitHandler = () => {

  }
  return (
    <>
      <VStack spacing={"5px"}>
        <FormControl id="firstname" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setname(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => setemail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size={'md'}>
            <Input
            type={show ? 'text' : 'password'}
            placeholder='Enter Your Password'
            size={'md'}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size={'md'}>
            <Input
            type={show ? 'text' : 'password'}
            onChange={(e) => setconfirmpassword(e.target.value)}
            placeholder='Confirm Your Password'
            size={'md'}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id='pic'>
          <FormLabel>Upload your Picture</FormLabel>
          <Input
          type='file'
          p={1.5}
          accept='image/*'
          onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>

        <Button colorScheme='orange' width={'100%'} style={{ marginTop: 15 }} onClick={submitHandler}>
          Sign Up
          </Button>
      </VStack>
    </>
  );
}

export default Register