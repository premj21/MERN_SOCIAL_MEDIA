import { Box, Text, Avatar, useColorModeValue ,Button,Input} from "@chakra-ui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCommentOnPost, deleteCommentOnPost } from "../../Actions/Postaction";
import { getFollowingPosts } from "../../Actions/UserAction";

const Comment = ({ postId, comments,user,onClose,id ,pr}) => {
  const pcr = useColorModeValue("#625a5e", "#666666");
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const commendadd = async() => {
    if (comment === "") return;
    onClose();
   await dispatch(addCommentOnPost(postId, comment));

   if (pr) {
     dispatch(getFollowingPosts("/api/post/posts/allposts"));
   } else {
     dispatch(getFollowingPosts("/api/auth/my/posts"));
   }
  };
  const commentdeletekarbhai = async (id) => {
    console.log("this is comment id ",id)
    onClose();
    await dispatch(deleteCommentOnPost(postId, id));
     if (pr) {
       dispatch(getFollowingPosts("/api/post/posts/allposts"));
     } else {
       dispatch(getFollowingPosts("/api/auth/my/posts"));
     }
  };





  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        w="100%"
        h={{ base: "300px", md: "500px" }}
        p="10px"
        overflowY={"scroll"}
        alignItems={"flex-start"}
        gap="2rem"
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          borderRadius={"10px"}
          gap="20px"
        >
          <Box
            w="100%"
            display={"flex"}
            borderBottom={`0.1px outset ${pcr}`}
            pb="20px"
            gap="20px"
          >
            <Avatar name="Dan Abrahmov" src={user} />
            <Input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Anything that in your mind  "
              borderRadius={"20px"}
              focusBorderColor={pcr}
            />
            <Button variant={"ghost"} onClick={commendadd}>
              Submit
            </Button>
          </Box>
        </Box>

        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          w="100%"
          h="fit-content"
          gap="2rem"
        >
          {comments.map((item) => (
            <>
              <Box
                key={item._id}
                w="100%"
                boxShadow={"0 3px 10px rgb(0 0 0 / 0.12)"}
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"start"}
                gap="15px"
                p="10px"
              >
                <Box
                  w="100%"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"start"}
                  gap="20px"
                >
                  <Avatar src={item.user.avatar.url} />
                  <Text fontWeight={"700"}>{item.user.name}</Text>
                  {id === item.user._id ? (
                    <Box
                      onClick={()=>commentdeletekarbhai(item._id)}
                    >
                      <DeleteIcon
                        style={{
                          justifySelf: "center",
                          color: "#c40c0cc4",
                          cursor: "pointer",
                        }}
                      />
                    </Box>

                  ) : null}
                </Box>
                <Box>
                  <Text fontWeight={"300"}>{item.Comment}</Text>
                </Box>
                <hr />
              </Box>
            </>
          ))}
        </Box>

        <hr />
      </Box>
    </>
  );
};

export default Comment;
