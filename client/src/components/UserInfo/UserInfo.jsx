/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, useColorModeValue, Text, Spinner } from "@chakra-ui/react";
import Profile from "../Profile";
import CreatePost from "../CreatePost";
import Posts from "../Posts";
import { Select } from "@chakra-ui/react";
import Friend from "../friendsss/Friend";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, userProfile } from "../../Actions/UserAction";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";


const UserInfo = () => {
  const dispatch = useDispatch();
  const [fl, setfl] = useState(false);
  const color = useColorModeValue("#454343", "#d9d9d9");
  const boxcr = useColorModeValue("#fffeff", "#181818");
  const prams = useParams();
  const  { User, loading } = useSelector((state) => state.Friend);

 const navigate = useNavigate(); 
 const {user} = useSelector((state)=>state.user); 

  const parms = useParams(); 
  
   useEffect(()=>{
const hellow = async () => {
  await dispatch(loadUser());
   if (parms.id.toString === user._id) {
     navigate("/home");
   }
};
hellow();
   },[])
   
    useEffect(() => {
        const hellow = async()=>{
            await dispatch(userProfile(prams.id));

        }
        hellow();
    },[dispatch]);
    

  const [pr, setpr] = useState(true);
  return User === undefined || user === undefined ? (
    <Spinner mt="2rem" size={"lg"} />
  ) : (
    <>
      <Navbar setpr={setpr} pr={pr} />
      <br />
      <Box
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        w="100%"
        h="fit-content"
        gap="3.5%"
      >
        <Box
          w={{ base: "100%", md: "30%" }}
          h="fit-content"
          borderRadius={"10px"}
          bg={boxcr}
        >

            <Profile
             userId = {user._id}
              name={User.name}
              id={User._id}
              email={User.email}
              avatar={User.avatar.url}
              followers={User.followers}
              following={User.following}
            />
        
        </Box>
        <Box
          order={{ base: "3", md: "2" }}
          w={{ base: "100%", md: "45%" }}
          borderRadius={"10px"}
          h="fit-content"
          mb="2rem"
        >
          <CreatePost user={user} />
          {loading === true ? (
            <Spinner mt="2rem" size={"lg"} />
          ) : (
            <Box
              mt="2rem"
              borderRadius={"10px"}
              display={"flex"}
              flexDirection={"column"}
              gap="20px"
            >
              {User.Posts && User.Posts.length > 0 ? (
                User.Posts.map((item, index) => (
                  <Posts
                    pr={pr}
                    key={index}
                    postId={item._id}
                    caption={item.caption}
                    pic={item.image.url}
                    likes={item.likes}
                    comments={item.Comments}
                    ownerImage={User.avatar.url}
                    ownerName={User.name}
                    ownerId={User._id}
                  />
                ))
              ) : (
                <Text variant="h6">NO post Yet</Text>
              )}
            </Box>
          )}
        </Box>
        <Box
          order={{ base: "2", md: "3" }}
          w={{ base: "100%", md: "30%" }}
          h="fit-content"
          borderRadius={"10px"}
          bg={boxcr}
          display={"flex"}
          flexDir={"column"}
          maxH={"500px"}
          overflowY={"scroll"}
          scrollbarWidth={"none"}
          mt={{ base: "2rem", md: "0" }}
          mb="1.2rem"
        >
          <Box
            borderRadius={"10px"}
            bg={boxcr}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Select border={"none"} bg={boxcr}>
              <option
                value="option1"
                bg={boxcr}
                color={color}
                onClick={() => setfl(true)}
              >
                Followers
              </option>
              <option
                value="option2"
                bg={boxcr}
                color={color}
                onClick={() => setfl(false)}
              >
                Following
              </option>
            </Select>
          </Box>

          <Box display={"flex"} flexDirection={"column"} p="20px" gap="0.7rem">
            {loading === false
              ? fl === true
                ? User.followers?.map((item, index) => (
                    <Friend
                     id={item._id}
                      name={item.name}
                      key={index}
                      pic={item.avatar.url}
                      email={item.email}
                    />
                  ))
                : User.following?.map((item, index) => (
                    <Friend
                     id={item._id}
                      name={item.name}
                      key={index}
                      pic={item.avatar.url}
                      email={item.email}
                    />
                  ))
              : <Spinner size={'xl'}/>}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserInfo;


