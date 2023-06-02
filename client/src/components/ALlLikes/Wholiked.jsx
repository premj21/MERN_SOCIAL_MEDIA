import React from 'react'
import {ModalHeader, Text, useDisclosure} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import Search from '../Search/Search';

const Wholiked = ({like,bg}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text
        alignSelf={"start"}
        fontSize={"16px"}
        onClick={onOpen}
        cursor={"pointer"}
        display={like.length === 0 ? "none" : null}
      >
        {like.length}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalBody>
            <ModalHeader>Liked By</ModalHeader>
            {like.map((item) => (
              <Search
                id={item._id}
                name={item.name}
                userId={item._id}
                avatar={item.avatar.url}
                key={item._id}
              />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Wholiked
