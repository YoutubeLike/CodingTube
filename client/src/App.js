import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Channel from "./pages/Channel.js";
import Upload from "./pages/Upload.js";
import Video from "./pages/Video.js";
import Header from './components/Header/Header.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route  path = "/" element={<Header/>}>
          <Route  path = "/channel" element={<Channel/>}/>
          <Route  path = "/upload" element={<Upload/>}/>
          <Route  path = "/video" element={<Video/>}/>
          
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;