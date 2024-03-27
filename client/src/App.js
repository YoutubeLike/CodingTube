import './App.css';
import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes} from "react-router-dom"
import "./index.css"
import Header from './search/header';
import DisplayedBurgerMenu from './timeline/component/displayedBurgerMenu';

function App() {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  )
}

export default App;
