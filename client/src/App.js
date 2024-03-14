import './App.css';
import React, { useEffect, useState } from 'react';
import Autre from "./Autre"
import { Outlet, Route, Routes} from "react-router-dom"
import "./index.css"

function App() {
  return (
    <>
      <div>
        <Outlet />
        <p className="text-3xl font-bold underline"> HEADER </p>
      </div>
    </>
  );
}

export default App;