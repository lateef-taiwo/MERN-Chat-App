import React from 'react'
import { chatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/Sub-Components/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

const Chats = () => {
  const { user } = chatState()

  return (
    <div style={{width: "100%"}}>
      {user && <SideDrawer />}
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        w={'100%'}
        h={'100vh'}
        p={'10px'}

      >
        {user && <MyChats/>}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}

export default Chats