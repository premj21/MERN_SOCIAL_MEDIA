import React from 'react'
import {Avatar, Box,Text, useToast} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, userProfile } from '../../Actions/UserAction';
import { useNavigate } from 'react-router-dom';


const Search = ({name,id,avatar}) => {
  const toast = useToast(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const {message } = useSelector((state) => state.Friend);

  const profileOpen = async(e)=>{
    e.preventDefault();
    console.log(id);
   await dispatch(userProfile(id));
   dispatch(loadUser());
   if (message) {
     toast({
       position: "top",
       title: `${message}`,
       status: "error",
       duration: 3000,
       isClosable: true,
     });
   } else {
     navigate(`/user/${id}`);
   }
  }
  return (
    <Box
      w="100%"
       maxH={{ base: "300px", md: "400px" }}
      overflowY={"scroll"}
      display={"flex"}
      flexDir={"column"}
      gap="15px"
      onClick={profileOpen}

    >
      <Box
        cursor={"pointer"}
        display={"flex"}
        alignItems={"center"}
        alignContent={"start"}
        justifyContent={"flex-start"}
        gap="20px"
        boxShadow={"0 3px 10px rgb(0 0 0 / 0.12)"}
        p="1rem"
      >
        <Avatar src={avatar} alt="no pic" />
        <Text>{name}</Text>
      </Box>
      
    </Box>
  );
}

export default Search
