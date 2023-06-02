import { Box, useColorModeValue, Avatar, Text } from "@chakra-ui/react";

import React from "react";

const Followers = ({name}) => {
  const pcr = useColorModeValue("#625a5e", "#666666");

  return (
    <>
      <Text w="100%" textAlign={"start"} m="0.6rem" fontWeight={"700"}>
        {name}
      </Text>

      <Box display={"flex"} flexDirection={"column"} p="20px" gap="0.7rem">
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          w="100%"
          gap="15px"
          pb="15px"
        >
          <Avatar name="Dan Abrahmov" src="https://bit.ly/sage-adebayo" />

          <Text>
            Prem Jadhav
            <Text fontSize={"12px"} color={pcr}>
              4 friends
            </Text>
          </Text>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          w="100%"
          gap="15px"
          pb="15px"
        >
          <Avatar name="Dan Abrahmov" src="https://bit.ly/kent-c-dodds" />

          <Text>
            Prem Jadhav
            <Text fontSize={"12px"} color={pcr}>
              4 friends
            </Text>
          </Text>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          w="100%"
          gap="15px"
          pb="15px"
        >
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

          <Text>
            Prem Jadhav
            <Text fontSize={"12px"} color={pcr}>
              4 friends
            </Text>
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Followers;
