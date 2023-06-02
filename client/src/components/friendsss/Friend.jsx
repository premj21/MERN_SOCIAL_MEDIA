import { Box, useColorModeValue,Avatar,Text } from "@chakra-ui/react";

import React from 'react'
import { useNavigate } from "react-router-dom";

const Friend = ({name,pic,email,id}) => {
   const pcr = useColorModeValue("#625a5e", "#666666");
   const navigate  = useNavigate(); 

   const userprofile = (e)=>{
    e.preventDefault();
     navigate(`/user/${id}`);
   }
  
  return (
    <>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          w="100%"
          gap="15px"
          pb="15px"
          cursor={'pointer'}
          onClick={userprofile}
        >
          <Avatar name="Dan Abrahmov" src={pic} />
            
          <Text>
           {name}
            <Text fontSize={"12px"} color={pcr}>
              {email}
            </Text>
          </Text>
        </Box>
    </>
  );
}

export default Friend
