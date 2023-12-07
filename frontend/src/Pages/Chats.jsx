import React, { useState } from "react";
import { chatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Sub-Components/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";


const Chats = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const isTokenValid = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  };
  const { user } = chatState();
  const [fetchAgain, setfetchAgain] = useState(false)

  useEffect(() => {
    // Check the token's expiration status every second (you can adjust the interval as needed)
    const tokenExpirationCheck = setInterval(() => {
      if (!token || !isTokenValid(token)) {
        // Token is not valid or has expired, log the user out
        clearInterval(tokenExpirationCheck);
        alert("Your login session has expired please login again");
        localStorage.removeItem("userInfo");

        navigate("/");
      }
    }, 1000); // Interval in milliseconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(tokenExpirationCheck);
    };
  }, [navigate, token]);

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
