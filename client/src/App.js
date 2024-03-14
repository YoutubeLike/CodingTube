import './App.css';
import React, { useEffect, useState } from 'react';
import Autre from "./Autre"
import { Outlet, Route, Routes} from "react-router-dom"

function App() {
  return (
    <>
      <div>
        <Outlet />
        <p> HEADER </p>
      </div>
    </>
  );
}

export default App;