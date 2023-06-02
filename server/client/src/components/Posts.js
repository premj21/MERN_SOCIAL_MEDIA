/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect, useState } from 'react'
import {
  Box,
  Avatar,
  Text,
  useColorModeValue,
  Image,
  useDisclosure,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
   Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";
import Comment from './comment/Comment.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../Actions/Postaction.js';
import { getFollowingPosts, userProfile } from '../Actions/UserAction.js';
import Wholiked from './ALlLikes/Wholiked.jsx';
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from 'react-router-dom';
const Posts = ({
  postId,
  pic,
  ownerName,
  ownerImage,
  caption,
  likes,
  comments,
  pr,
}) => {
  const [like, setlike] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pcr = useColorModeValue("#625a5e", "#666666");
  const boxcr = useColorModeValue("#fffeff", "#181818");
  const toast = useToast();

  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    likes.forEach((item) => {
      if (user._id === item._id) {
        setlike(true);
      }
    });
  }, [likes, user._id]);




  const parms = useParams();
  const likehandle = async () => {
    setlike(!like);
    await dispatch(likePost(postId));
    if(parms.id){
     await dispatch(userProfile(parms.id));
    }
   else if (pr) {
      dispatch(getFollowingPosts("/api/post/posts/allposts"));
    } else {
      dispatch(getFollowingPosts("/api/auth/my/posts"));
    }
  };

  const deletepost = async () => {
    await dispatch(deletePost(postId));
     await dispatch(getFollowingPosts("/api/auth/my/posts"));
        toast({
          position: "top",
          title: "Post Deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });      
  };
  return (
    <Box
      w="100%"
      bg={boxcr}
      borderRadius={"10px"}
      display={"flex"}
      flexDirection={"column"}
      p="20px"
      gap="10px"
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        w="100%"
        gap="15px"
        pb="15px"
      >
        <Avatar name="Prem" src={ownerImage} />
        <Text>
          {ownerName}
          <Text fontSize={"12px"} color={pcr}>
            {`@${ownerName}`}
          </Text>
        </Text>
      </Box>

      <Box alignSelf={"center"}>
        <Text fontSize={"17px"} color={pcr}>
          {caption}
        </Text>
      </Box>
      <Box marginBottom={"20px"} alignSelf={"center"}>
        <Image borderRadius={"10px"} src={pic} alt="no pic" />
      </Box>
      <Box
        display={"flex"}
        gap="20px"
        w="100%"
        alignItems={"center"}
        justifyContent={"start"}
      >
        <Wholiked like={likes} bg={boxcr} />
        <Box>
          {like ? (
            <Favorite
              style={{
                cursor: "pointer",
                color: "red",
              }}
              onClick={likehandle}
            />
          ) : (
            <FavoriteBorderIcon
              style={{
                cursor: "pointer",
              }}
              onClick={likehandle}
            />
          )}
        </Box>
        <Box onClick={onOpen}>
          <ChatBubbleOutlineIcon style={{ cursor: "pointer" }} />
          <Modal isOpen={isOpen} onClose={onClose} variant={"ghost"}>
            <ModalOverlay />
            <ModalContent bg={boxcr} w={{ base: "90%", md: "60%", lg: "90%" }}>
              <ModalHeader>All Comments</ModalHeader>
              <ModalBody>
                <Comment
                  onClose={onClose}
                  pr={pr}
                  postId={postId}
                  comments={comments}
                  user={user.avatar.url}
                  id={user._id}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
        <Box>
 {pr === false ? <DeleteIcon onClick={deletepost} style={{color:'red', cursor:'pointer'}} /> : null}
        </Box>
        
      </Box>
    </Box>
  );
};
export default Posts