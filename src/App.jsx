import { useState } from "react";
import "./App.css";
import Market from "./components/Market";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Market />
      <ToastContainer />
    </>
  );
}

export default App;
