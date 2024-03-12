// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
// import { ProtectedRoute } from "./pages/ProtectedRoute";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          {/* <Route path="/" element={<ProtectedRoute element={<Home />} />} /> */}

          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
