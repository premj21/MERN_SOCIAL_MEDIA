import React, { useState } from 'react'
import {
  Box,
  useColorMode,
  Text,
  Input,
  useColorModeValue,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Search from './Search/Search';
import { useDispatch } from 'react-redux';
import { getFollowingPosts} from '../Actions/UserAction';
import Lg from './Changepass/Lg';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Navbar = ({setpr, pr}) => {
  const parms = useParams();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [loading,setloading] = useState(); 
   const [searchresult, setsearchresult] = useState([]);
   const [msg, setmsg] = useState('');
  const [st,setst] = useState(false);
  const {toggleColorMode} = useColorMode();
   const boxcr = useColorModeValue("#fffeff", "#181818");
   const toast = useToast(); 
   const handleKeyDown = async(e) =>{
    console.log(e.target.value); 
       e.preventDefault();
       if (msg!=='') {
         try {
           setloading(true);
           const con = {
             headers: {
               token: localStorage.getItem("token"),
              },
            };
            const { data } = await axios.get(
              `/api/auth/users?search=${msg}`,
              con
              );
              setloading(false);
              setmsg('');
              setsearchresult(data.user);
              onOpen();
            } catch (error) {
              toast({
                position: "top",
                title: "Internal Error",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
}
   }




    const dispatch = useDispatch();
    const navigate =useNavigate(); 
    const handleit = async()=>{
      if(parms.id){
        setpr(true);
      }
      else{
        setpr(false);
      }
      await dispatch(getFollowingPosts("/api/auth/my/posts"));
      navigate('/home');
   }

   const homeload = async()=>{
    setpr(true)
    if(parms.id) {
      navigate('/home');
    }
    else
    await dispatch(getFollowingPosts("/api/post/posts/allposts"));
   }
     return (
       <Box
         w="100%"
         display="flex"
         alignItem="center"
         justifyContent={"space-between"}
         pt="1.5rem"
         pb="10px"
         borderBottom={`2px solid ${boxcr}`}
         flexWrap={{ base: "wrap", md: "null" }}
         gap={{ base: "10px", md: "null" }}
       >
         <Box
           display={"flex"}
           gap={{ base: "10px", md: "2rem" }}
           alignItems={"center"}
         >
           <Text
             onClick={homeload}
             cursor={"pointer"}
             fontSize={{ base: "6vmin", md: "5vmin", lg: "4vmin" }}
             fontWeight={"600"}
           >
             FriendNet
           </Text>

           {window.location.href.toString() !== "http://localhost:3000/" ? (
             <>
               <Input
                 type="text"
                 value={msg}
                 onChange={(e) => setmsg(e.target.value)}
                 outline={0}
                 boxShadow="0px 5px 20px rgba(0,0,0,0.009)"
                 _focus={{
                   boxShadow: "0px 5px 20px rgba(0,0,0,0.11)",
                   border: "none",
                 }}
                 placeholder="search user ... "
                 w={{ base: "40%", md: "60%" }}
                 h={{ base: "90%", md: "80%", lg: "90%" }}
               />
               <Text cursor={"pointer"} onClick={handleKeyDown}>
                 Go
               </Text>
             </>
           ) : null}

           <Modal isOpen={isOpen} onClose={onClose}>
             <ModalOverlay />
             <ModalContent
               bg={boxcr}
               w={{ base: "80%", md: "40%", lg: "25%" }}
               position={"absolute"}
               left="10"
               top="10"
             >
               <ModalBody>
                 {searchresult.length > 0 ? (
                   searchresult?.map((item, index) => (
                     <Search
                       key={index}
                       loading={loading}
                       id={item._id}
                       avatar={item.avatar.url}
                       name={item.name}
                       email={item.email}
                     />
                   ))
                 ) : (
                   <Text>No User Found</Text>
                 )}
               </ModalBody>
             </ModalContent>
           </Modal>
         </Box>

         <Box
           cursor={"pointer"}
           display={"flex"}
           alignItems={"center"}
           gap="20px"
         >
           {pr === true ? (
             <Box>
               <Button onClick={handleit}>My Profile</Button>
             </Box>
           ) : (
             <Lg />
           )}
           <Box onClick={toggleColorMode}>
             {st === false ? (
               <LightModeIcon onClick={() => setst(!st)} />
             ) : (
               <ModeNightIcon onClick={() => setst(!st)} />
             )}
           </Box>
         </Box>
       </Box>
     );
}


export default Navbar



