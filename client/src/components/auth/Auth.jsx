import React, { useState } from 'react'
import {Box, useColorModeValue,Text, Input, Button} from '@chakra-ui/react'
import axios from 'axios';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const Auth = () => {
  const toast = useToast();
  const navigate = useNavigate(); 
  const [lg,setlg] = useState(true);
  const [name,setname] = useState('');
  const [email, setemail] = useState("");
  const [image, setimage] = useState(null);

  const [password, setpassword] = useState("");

   const color = useColorModeValue("#454343", "#d9d9d9");
    const pcr = useColorModeValue("##625a5e", "#666666");
   const boxcr = useColorModeValue("#fffeff", "#181818");

   const submithandlere = async(e) =>{
   e.preventDefault();
   if(name==='' || email ==='' || password ==='' || image===null){
      toast({
        description: "Fill Evrything",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
   }
  try {
    const { data } = await axios.post(
      "/api/auth/register",
      { name, email,password ,image},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(data.success === true){
      toast({
        description: "Register Successfull",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate('/home');
    }
  } catch (error) {
              toast({
                description: "Invalid Credential",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
  }
   }

   const imagechanger = (e)=>{
    const file = e.target.files[0];
    const Reader  = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () =>{
      if(Reader.readyState === 2){
             setimage(Reader.result);
      }
    } 
   }

   const loginhandler =async(e) =>{
     e.preventDefault();
     if (email === "" || password === "") {
       toast({
         description: "Invalid Credential",
         status: "error",
         duration: 2000,
         isClosable: true,
       });
     }


  try {
    const { data } = await axios.post(
      "/api/auth/login",
      {email,password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(data.success === true){
      localStorage.setItem('token',data.token);
       toast({
         description: "Login Successfull",
         status: "success",
         duration: 5000,
         isClosable: true,
       });
      navigate('/home');
    }
    if(data.success!==true){
       toast({
         position: "bottom",
         description: "Invalild Credential",
         status: "error",
         duration: 5000,
         isClosable: true,
       });
      }
  } catch (error) {
              toast({
                position: "bottom",

                description: "Invalild Credential",

                status: "error",
                duration: 2000,
                isClosable: true,
              });
              console.log(error)
  }
   }
  return (
    <>
      <Navbar />
      <br />
      <Box
        display={"flex"}
        borderRadius={"20px"}
        bg={boxcr}
        color={color}
        flexDir={"column"}
        gap="3rem"
        w={{ base: "100%", md: "70%", lg: "50%" }}
        h="100%"
        m="auto"
        p="2rem"
        justifyContent={"space-between"}
      >
        {lg === false ? (
          <>
            <Text fontSize={"2rem"} textAlign={"center"}>
              SignIn
            </Text>
            <Box
              display={"flex"}
              gap="20px"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text>Name</Text>
              <Input
                type="text"
                value={name}
                placeholder="Enter Your name"
                required={true}
                onChange={(e) => setname(e.target.value)}
              />
            </Box>

            <Box
              display={"flex"}
              gap="20px"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text>Email</Text>
              <Input
                type="email"
                value={email}
                placeholder="Enter Your Email"
                required={true}
                onChange={(e) => setemail(e.target.value)}
              />
            </Box>

            <Box
              display={"flex"}
              gap="20px"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text>Password</Text>
              <Input
                type="password"
                value={password}
                placeholder="Enter Your Password"
                required={true}
                onChange={(e) => setpassword(e.target.value)}
              />
              <Input
               type='file'
               accept='image/*'
               onChange={imagechanger}
              />

            </Box>
            <Button variant={"ghost"} onClick={submithandlere}>
              Submit
            </Button>

            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap="30px"
              cursor={"pointer"}
            >
              <Text color={pcr} onClick={() => setlg(true)}>
                Login
              </Text>
              <Text color={pcr} onClick={() => setlg(false)}>
                SignIn
              </Text>
            </Box>
          </>
        ) : (
          <>
            <Text fontSize={"2rem"} textAlign={"center"}>
              Login
            </Text>
            <Box
              display={"flex"}
              gap="20px"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text>Email</Text>

              <Input
                type="email"
                value={email}
                placeholder="Enter Your Email"
                required={true}
                onChange={(e) => setemail(e.target.value)}
              />
            </Box>

            <Box
              display={"flex"}
              gap="20px"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text>Password</Text>
              <Input
                type="password"
                value={password}
                placeholder="Enter Your Password"
                required={true}
                onChange={(e) => setpassword(e.target.value)}
              />
            </Box>
            <Button variant={"ghost"} onClick={loginhandler}>
              Submit
            </Button>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap="30px"
              cursor={"pointer"}
            >
              <Text color={pcr} onClick={() => setlg(true)}>
                Login
              </Text>
              <Text color={pcr} onClick={() => setlg(false)}>
                SignIn
              </Text>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default Auth
