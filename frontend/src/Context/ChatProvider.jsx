import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setuser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   setuser(userInfo);

   if (!userInfo){
        navigate("/");
   }
  }, [navigate])
  
  return (
    <chatContext.Provider value={{ user, setuser }}>
      {children}
    </chatContext.Provider>
  );
};

export const chatState = () => {
  return useContext(chatContext);
};

export default ChatProvider;
