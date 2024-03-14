import './App.css';
import React, { useEffect, useState } from 'react';
import Autre from "./Autre"
import { Outlet, Route, Routes} from "react-router-dom"
import "./index.css"
import Authentification from './profil/Pages/Authentification';

function App() {
  return (
    <>
      <div>
        <Outlet />
        <Authentification />
      </div>
    </>
  );
}

export default App;