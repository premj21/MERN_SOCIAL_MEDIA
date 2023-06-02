import React, { useState } from 'react'
import {
  Box,
  Avatar,
  Input,
  Text,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
    import ImageIcon from "@mui/icons-material/Image";
import { useDispatch } from 'react-redux';
import { createNewPost } from '../Actions/Postaction';
import { getFollowingPosts } from '../Actions/UserAction';


const CreatePost = ({user}) => {
    const [image, setimage] = useState(null);
    const [caption,setcaption] = useState('');
    const pcr = useColorModeValue("##625a5e", "#666666");
    const boxcr = useColorModeValue("#fffeff", "#181818");
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
     const donepost = async(e)=>{
       e.preventDefault();
       if(image===null) {
         toast({
           position: "top",
           title: "Image missing",
           status: "error",
           duration: 3000,
           isClosable: true,
         });
         return ;
       }

     await dispatch(createNewPost(caption,image));
     setcaption('');
     setimage(null);
         toast({
          position:"top",
           title: "Post Created",
           status: "success",
           duration: 3000,
           isClosable: true,
         });
 dispatch(getFollowingPosts("/api/auth/my/posts"));
     }

  return (
    <Box
      bg={boxcr}
      display={"flex"}
      flexDirection={"column"}
      borderRadius={"10px"}
      p="20px"
      gap="20px"
    >
      <Box
        w="100%"
        display={"flex"}
        borderBottom={`0.1px outset ${pcr}`}
        pb="20px"
        gap="20px"
      >
        <Avatar name="pREM jadhav" src={user.avatar.url} />
        <Input
          placeholder="Anything that in your mind  "
          borderRadius={"20px"}
          focusBorderColor={pcr}
          value={caption}
          onChange={(e) => setcaption(e.target.value)}
        />
      </Box>
      <Box
        display={"flex"}
        w="100%"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} gap="10px">
          <ImageIcon />
          <Text color={pcr} >
            Image
          </Text>

          <Input
          cursor={'pointer'}
            type="file"
            w="10%"
            opacity="0"
            position={"absolute"}
            accept="image/*"
            onChange={imagechanger}
          />
        </Box>
        <Button colorScheme="blue" variant={"ghost"} onClick={donepost}>
          Post
        </Button>
      </Box>
    </Box>
  );
}

export default CreatePost
