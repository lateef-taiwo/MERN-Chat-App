import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css'
import Signup from './Pages/Signup';
import Chats from './Pages/Chats';


const App = () => {
  return (
    <div className='min-h-screen flex App bg-cover bg-center'>
          <Routes>
            <Route path='/' element={<Signup/>}/>
            <Route path='/dashboard' element={<Chats/>}/>
          </Routes>
        
    </div>
  );
}

export default App