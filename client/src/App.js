import './App.css';
import React, { useEffect, useState } from 'react';
import Autre from "./Autre"
import { Outlet, Route, Routes} from "react-router-dom"
import "./index.css"
import Header from './search/header';

function App() {
  return (
    <>
      <div>
        <Outlet />
        <Header />
      </div>
    </>
  );
}

export default App;