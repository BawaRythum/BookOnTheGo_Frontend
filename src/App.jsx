import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Payment from "./components/payment";
import MyEvents from "./components/myEvents";
import CreateEvent from "./components/createEvents";
import Home from "./components/home";
import EventDetails from "./components/eventDetails";
import Update from "./components/updateForm";
import OTPVerification from "./components/otpVerification";
import UnsubscribePage from "./components/UnsubscribePage"; 

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
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unsubscribe" element={<UnsubscribePage />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
