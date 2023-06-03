import React from 'react'
import { logoutUser } from '../../Actions/UserAction';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Lg = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const logouthandler =async () => {
      await dispatch(logoutUser());
        navigate('/')
     };
  return (
    <>
        <Box onClick={logouthandler}>
          <Button>LogOut</Button>
        </Box>
    </>
  );
}

export default Lg
