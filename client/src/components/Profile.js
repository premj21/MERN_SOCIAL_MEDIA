/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box ,Avatar,Text,useColorModeValue, Button, useToast, Spinner} from '@chakra-ui/react'
import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { userProfile } from '../Actions/UserAction';
import { useParams } from 'react-router-dom';

const Profile = ({ name, avatar, email ,id}) => {
  const pcr = useColorModeValue("#625a5e", "#666666");
   const [p, setp] = useState(false); 
    const {user} = useSelector((state) => state.user);

    const [us,setus] = useState(false); 
    const toast = useToast();
    const dispatch = useDispatch(); 
    const {loading ,User} = useSelector((state)=>state.Friend); 
    const parms = useParams(); 
      const followhandle =async (e)=>{
        e.preventDefault(); 
        try {
         const {data} = await axios.get(`/api/auth/follow/${id}`);
         console.log("first User.followers",User.followers);
           await dispatch(userProfile(parms.id));
           console.log("Second User.followers",User.followers);
           toast({
             position: "top",
             title: `${data.message}`,
             status: "success",
             duration: 3000,
             isClosable: true,
            });         
            setp(!p); 
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
        useEffect(() => {
          const home = ()=>{
   if (id.toString() === user._id.toString()) {
     setus(true);
   } else {
     for (let i = 0; i < user.following.length; i++) {
       if (id.toString() === user.following[i]._id.toString()) {
         setp(true);
         break;
       }
     }
   }
      }
          const prem= async()=>{
              await home();
          }
          prem();
        }, [loading,dispatch]);

  return loading===true?<Spinner size={'xl'}/>: (
    <>
      <Box display={"flex"} flexDirection={"column"} w="100%" p="20px">
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          w="100%"
          gap="18px"
          flexWrap={"wrap"}
        >
          <Avatar name="Dan Abrahmov" src={avatar} alt="/nothing" />
          <Text>
            {name}
            <Text fontSize={"12px"} color={pcr}>{`${email}`}</Text>
          </Text>
          {us === false ? (
            p === false ? (
              <Button
                variant={"ghost"}
                w="20%"
                onClick={followhandle}
                fontSize={"80%"}
              >
                Follow
              </Button>
            ) : (
              <Button
                onClick={followhandle}
                variant={"ghost"}
                w="10%"
                fontSize={"60%"}
              >
                Unfollow
              </Button>
            )
          ) : null}
        </Box>
        <Box mt="15px" pb="15px" borderBottom={`0.1px outset ${pcr}`}>
          <Box
            w="100%"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"13px"} color={pcr}>
              Followers
            </Text>
            <Text fontSize={"15px"}>{User.followers.length}</Text>
          </Box>
          <Box
            w="100%"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"13px"} color={pcr}>
              Following
            </Text>
            <Text fontSize={"15px"}>{User.following.length}</Text>
          </Box>
        </Box>
        <Box mt="10px">
          <Text mb="3px"> Bio </Text>
          <Text fontSize={"13px"} color={pcr}>
            Hii my Name is Prem and I am a web developer . I am studying in 3
            Year of my college pursuingg Btech degree
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Profile
