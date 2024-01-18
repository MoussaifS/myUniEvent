import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import AdminLanding from "./pages/admin/admin-pages/AdminLanding";
import AdminDashboard from "./pages/admin/admin-pages/AdminDashboard";
import MainLandingPage from "./pages/MainLandingPage";
import UserAuth from "./pages/user/userPages/UserAuth";
import Events from "./pages/user/userPages/Events";
import Event from "./pages/user/userPages/Event";
function App() {

  
  return (
    <div id="app">
      <Routes>
        <Route exact path="/" element={<MainLandingPage />} />
        <Route exact path="/admin" element={<AdminLanding />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/user-auth" element={<UserAuth />} />
        <Route exact path="/events" element={<Events />} />
        <Route exact path="/event/:id" element={<Event />} />
      </Routes>
    </div>
  );
}

export default App;
