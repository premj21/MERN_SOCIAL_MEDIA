import { Box, Text,Input,Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loadUser, updateProfile } from '../../Actions/UserAction';

const Editprofile = () => {
  const [avatar,setimage] = useState(null);
  const [name,setname] = useState('');
  const [email, setemail] = useState("");

   const imagechanger = (e) => {
     const file = e.target.files[0];
     const Reader = new FileReader();
     Reader.readAsDataURL(file);
     Reader.onload = () => {
       if (Reader.readyState === 2) {
         setimage(Reader.result);
       }
     };
   };

    const toast = useToast();
   const dispatch = useDispatch(); 
   const changetheprofile = async(e)=>{
    e.preventDefault();
   await dispatch(updateProfile(name,email,avatar));
    dispatch(loadUser()); 
      toast({
        position: "top",
        title: "Profile Updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

   }

  
  return (
    <Box w="100%" p="1rem" display={"flex"} flexDir={"column"} gap="20px">
      <Text textAlign={"center"}>Update Profile </Text>
      <Box>
        <Text mb="10px">Name:</Text>
        <Input placeholder="enter your name" type="text"  value={name} onChange={(e)=>setname(e.target.value)}/>
      </Box>
      <Box>
        <Text mb="10px">Email:</Text>
        <Input placeholder="enter your Email" type="Email" value={email} onChange={(e)=>setemail(e.target.value)} />
      </Box>

      <Box>
        <Text mb="10px">Profile</Text>
        <Input type="file" accept="image/*" onChange={imagechanger} />
      </Box>

      <Box>
        <Button variant={"ghost"} onClick={changetheprofile}>
          Change
        </Button>
      </Box>
    </Box>
  );
}

export default Editprofile
