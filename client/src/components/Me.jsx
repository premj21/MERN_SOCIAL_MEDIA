import React from 'react'

import { Box, Avatar, Text, useColorModeValue } from "@chakra-ui/react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";


const Me = () => {
       const pcr = useColorModeValue("#625a5e", "#666666");
  return (
      <Box display={"flex"} flexDirection={"column"} w="100%" p="20px">
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          w="100%"
          gap="15px"
          pb="15px"
          borderBottom={`0.1px outset ${pcr}`}
        >
          <Avatar
            name="Dan Abrahmov"
            src="https://media.licdn.com/dms/image/D4D03AQHnow_nZqY5YQ/profile-displayphoto-shrink_400_400/0/1665315277507?e=1687392000&v=beta&t=zXotq98Pl16lXz6939f2wYCVuzU0AJP-BKpSSVSzFFY"
          />

          <Text>
            Prem Jadhav
            <Text fontSize={"12px"} color={pcr}>
              Founder
            </Text>
          </Text>
        </Box>

        <Box mt="15px" pb="15px" borderBottom={`0.1px outset ${pcr}`}>
          <Text mb="3px">Socials</Text>
          <Box
            w="100%"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb="10px"
          >
            <Text fontSize={"13px"} color={pcr}>
              Github
            </Text>
            <a href="https://www.github.com/premj21" alt="/">
              <GitHubIcon style={{ cursor: "pointer" }} />
            </a>
          </Box>

          <Box
            w="100%"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"13px"} color={pcr}>
              Linkedin
            </Text>
            <a
              href="https://www.linkedin.com/in/prem-jadhav-a8b654228/"
              alt="/"
            >
              <LinkedInIcon style={{ cursor: "pointer" }} />
            </a>
          </Box>
        </Box>

        <Box mt="10px">
          <Text mb="3px"> Bio </Text>
          <Text fontSize={"13px"} color={pcr}>
            Hii my Name is Prem and I am a web developer . I am studying in 3
            Year of college pursuingg Btech degree . I am the founder of this
            website called Pregram have fun on this website .... Thank You !!
          </Text>
        </Box>
      </Box>
  );
}
export default Me
