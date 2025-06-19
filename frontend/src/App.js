// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategorySelect from "./pages/CategorySelect";
import Quiz from "./pages/Quiz";
import PreviousTasks from "./pages/PreviousTasks";

function App() {
  return (
    <Router>
      <div style={styles.header}>
        <h1>🧠 SmartQuiz</h1>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<CategorySelect />} />
        <Route path="/quiz/:category" element={<Quiz />} />
        <Route path="/previous" element={<PreviousTasks />} />
      </Routes>
    </Router>
  );
}

const styles = {
  header: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "1rem",
    textAlign: "center",
    marginBottom: "1rem",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  }
};

export default App;
