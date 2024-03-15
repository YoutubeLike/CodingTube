import "./App.css";
import React, { useEffect, useState } from "react";
import Autre from "./Autre";
import { Outlet, Route, Routes } from "react-router-dom";
import "./index.css";
import Authentification from "./profil/Pages/Authentification";
import ProfilePage from "./profil/Pages/MyAccount";

function App() {
  return (
    <>
      <div>
        <Outlet />
        <ProfilePage />
      </div>
    </>
  );
}

export default App;
