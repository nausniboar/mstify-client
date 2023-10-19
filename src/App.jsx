import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Home2 from '../pages/Home2'
import CommentPage from '../pages/CommentPage'
import './App.css'

function App() {
  console.log(window.location.pathname);
  return (
    <BrowserRouter> 
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/about" element={<Home2/>}/>
        <Route path={window.location.pathname} element={<CommentPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
