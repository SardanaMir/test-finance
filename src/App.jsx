import { useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import MainPage from "./pages/Main/MainPage";
import ToastWrapper from "./components/ToastWrapper/ToastWrapper";

function App() {
  return (
    <>
      <MainPage />
      <ToastWrapper />
    </>
  );
}

export default App;
