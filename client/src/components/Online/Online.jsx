import { Box, Button, Modal, ModalBody, ModalContent, ModalOverlay, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Search from '../Search/Search';

const Online = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

   const boxcr = useColorModeValue("#fffeff", "#181818");
  return (
    <>
    <Box>
        <Button variant={'ghost'} onClick={onOpen}>
            See Who's Onlne 
        </Button>
    </Box>



<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={{md:'30%',lg:'20%'}} bg={boxcr} position={'relative'} top='4' right={{md:'-150px',lg:'-500px'}}>
          <ModalBody >
           <Search/>
          </ModalBody>
        </ModalContent>
      </Modal>



    </>

  )
}

export default Online
