import React, { useState } from "react";
import { chatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Sub-Components/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";


const Chats = () => {
  const { user } = chatState();
  const [fetchAgain, setfetchAgain] = useState(false)

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w={"100%"}
        h={"90vh"}
        p={"10px"}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chats;
