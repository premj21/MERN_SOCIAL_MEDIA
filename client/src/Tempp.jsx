/* eslint-disable react-hooks/exhaustive-deps */
import React  from "react";

import { Routes, Route,  } from "react-router-dom";
import { Box, Spinner, useColorModeValue } from "@chakra-ui/react";
import Home from './components/Homepage/Home'
import Auth from './components/auth/Auth'
import {  useSelector } from "react-redux";
import UserInfo from "./components/UserInfo/UserInfo";
// import { loadUser } from "./Actions/UserAction";

const Tempp = () => {
  const bg = useColorModeValue("#f3f3f3", "#0d0d0d");
  const color = useColorModeValue("#454343", "#d9d9d9");
    const { isAuthenticated} = useSelector((state) => state.user);

    //  const dispatch = useDispatch();
    //  useEffect(() => {
    //    const hellow = async () => {
    //      await dispatch(loadUser());
    //    };
    //    hellow();
    //  },[]);
       
     
  return isAuthenticated === false ? (
    <Spinner size={"lg"} />
  ) : (
    <>
      <Box w="100vw" minH="100vh" bg={bg} color={color} p="0 6%">
        <Routes>
          <Route path="/home/" element={<Home />} />
          <Route path="/user/:id" element={<UserInfo />} />
          <Route exact path="/" element={<Auth />} />
        </Routes>
      </Box>
    </>
  );
};

export default Tempp;
