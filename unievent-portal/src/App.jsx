import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLanding from "./pages/admin-pages/AdminLanding";
import AdminDashboard from "./pages/admin-pages/AdminDashboard";
import MainLandingPage from "./pages/MainLandingPage";
import UserAuth from "./pages/user/user-pages/UserAuth";
import Events from "./pages/user/user-pages/Events"
import Event from "./pages/user/user-pages/Event"
function App() {
  return (
      <Routes>
        <Route exact path="/" element={<MainLandingPage/>} />
        <Route exact path="/admin" element={<AdminLanding />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/user-auth" element={<UserAuth/>}/>
        <Route exact path="/events" element={<Events/>}/>
        <Route exact path="/event/:id" element={<Event/>}/>
      </Routes>
  );
}

export default App;
