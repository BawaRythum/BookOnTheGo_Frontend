import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Payment from "./components/payment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />          {/* Landing page */}
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
