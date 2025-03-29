import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Payment from "./components/payment";
import MyEvents from "./components/myEvents";
import CreateEvent from "./components/createEvents";
import Home from "./components/home";
import Details from "./components/eventDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />          {/* Landing page */}
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/myEvents" element={<MyEvents />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
