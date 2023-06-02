/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, useColorModeValue, Text, Spinner } from "@chakra-ui/react";
import CreatePost from "../CreatePost";
import Posts from "../Posts";
import { Select } from "@chakra-ui/react";
import Friend from "../friendsss/Friend";
import Me from "../Me";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts, loadUser } from "../../Actions/UserAction";
import Navbar from "../Navbar";
import Myprofile from "../Myprofile";
const Home = () => {
  const dispatch = useDispatch();
    const [fl, setfl] = useState(false);
    const color = useColorModeValue("#454343", "#d9d9d9");
    const boxcr = useColorModeValue("#fffeff", "#181818");
    const { posts } = useSelector((state) => state.postOfFollowing);
    const Loader = useSelector((state) => state.postOfFollowing.loading);
    const Ldr = useSelector((state) => state.like.message);
    
    useEffect(() => {
       dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFollowingPosts("/api/post/posts/allposts"));
  }, [dispatch]);

  const { user, loading } = useSelector((state) => state.user);

  const [pr,setpr] = useState(true);

   return user === undefined ? (
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
           {loading === true ? (
             <Spinner size={"xl"} />
           ) : pr === true ? (
             <Me />
           ) : (
             <Myprofile
               name={user.name}
               avatar={user.avatar.url}
               followers={user.followers}
               following={user.following}
               email={user.email}
             />
           )}
         </Box>
         <Box
           order={{ base: "3", md: "2" }}
           w={{ base: "100%", md: "45%" }}
           borderRadius={"10px"}
           h="fit-content"
           mb="2rem"
         >
           <CreatePost user={user} />
           {Loader === true &&
           (Ldr === "Post Created" || Ldr === "Post Deleted") ? (
             <Spinner mt="2rem" size={"lg"} />
           ) : (
             <Box
               mt="2rem"
               borderRadius={"10px"}
               display={"flex"}
               flexDirection={"column"}
               gap="20px"
             >
               {posts && posts.length > 0 ? (
                 posts.map((item, index) => (
                   <Posts
                     pr={pr}
                     key={index}
                     postId={item._id}
                     caption={item.caption}
                     pic={item.image.url}
                     likes={item.likes}
                     comments={item.Comments}
                     ownerImage={item.owner.avatar.url}
                     ownerName={item.owner.name}
                     ownerId={item.owner._id}
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
                 cursor={"pointer"}
                 value="option1"
                 bg={boxcr}
                 color={color}
                 onClick={() => setfl(true)}
               >
                 Followers
               </option>
               <option
                 cursor={"pointer"}
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
             {user !== undefined ? (
               fl === true ? (
                 user.followers?.map((item, index) => (
                   <Friend
                   
                     id={item._id}
                     name={item.name}
                     key={index}
                     pic={item.avatar.url}
                     email={item.email}
                   />
                 ))
               ) : (
                 user.following?.map((item, index) => (
                   <Friend
                     id={item._id}
                     name={item.name}
                     key={index}
                     pic={item.avatar.url}
                     email={item.email}
                   />
                 ))
               )
             ) : (
               <Spinner size={"xl"} />
             )}
           </Box>
         </Box>
       </Box>
     </>
   );
};

export default Home;
