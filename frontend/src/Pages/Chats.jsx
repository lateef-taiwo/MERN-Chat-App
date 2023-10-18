import React from 'react'
import { chatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'

const Chats = () => {
  const { user } = chatState()

  return (
    <div style={{width: "100%"}}>
      {/* {user && <SideDrawer />} */}
      <Box>
        {/* {user && <MyChats />}
        {user && <ChatBox />} */}
      </Box>
    </div>
  )
}

export default Chats