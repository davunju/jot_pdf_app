import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MergeFiles from "./components/MergeFiles";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import SplitFiles from "./components/SplitFiles";
import CompressFiles from "./components/CompressFiles";
import Homepage from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="merge_files" element={<MergeFiles />} />
        <Route path="split_files" element={<SplitFiles />} />
        <Route path="compress_files" element={<CompressFiles />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
