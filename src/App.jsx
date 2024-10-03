import React from "react";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Compare from "./pages/compare";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      {/* <Router> */}
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
      {/* </Router> */}
    </>
  );
}

export default App;
