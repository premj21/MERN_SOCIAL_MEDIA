/* eslint-disable react-hooks/exhaustive-deps */
import { Box ,Avatar,Text,useColorModeValue, Button, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure} from '@chakra-ui/react'
import React from 'react'
import Changepass from './Changepass/Changepass';
import Editprofile from './Changepass/Editprofile'

const Myprofile = ({ name, avatar, followers, following, email}) => {
  const pcr = useColorModeValue("#625a5e", "#666666");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const boxcr = useColorModeValue("#fffeff", "#181818");
    

  return (
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
            <Text fontSize={"12px"} color={pcr}>{`@${email}`}</Text>
          </Text>
        </Box>

        <Box
          mt="1rem"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          pb="15px"
          borderBottom={`0.1px outset ${pcr}`}
        >
          <Button
            variant={"ghost"}
            fontSize={"12px"}
            h="fit-content"
            w="fit-content"
            color={pcr}
            onClick={onOpen}
          >
            EditProfile
          </Button>
          <Changepass color={pcr} />
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
            <Text fontSize={"15px"}>{followers.length}</Text>
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
            <Text fontSize={"15px"}>{following.length}</Text>
          </Box>
        </Box>
        <Box mt="10px">
          <Text mb="3px"> Bio </Text>
          <Text fontSize={"13px"} color={pcr}>
            Hii my Name is Prem and I am a web developer . I am studying in 3
            Year of my college pursuingg Btech degree
          </Text>
        </Box>
        <Box>
          <Button variant={'ghost'} mt='1rem' fontSize={'80%'}>Delete Profile</Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={boxcr}>
          <ModalBody> <Editprofile /></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};


export default Myprofile
