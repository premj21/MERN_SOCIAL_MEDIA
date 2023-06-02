import { Button } from '@chakra-ui/react'
import React from 'react'

const Changepass = ({color}) => {
  return (
    <>
      <Button
        variant={"ghost"}
        fontSize={"12px"}
        h="fit-content"
        w="fit-content"
        color={color}
        onClick={()=>alert('link has beed send to ur Email')}
      >
        ForgotPass ?
      </Button>


    </>
  );
}

export default Changepass
