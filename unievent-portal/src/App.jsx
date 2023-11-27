import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLanding from "./pages/admin-pages/AdminLanding";
import AdminDashboard from "./pages/admin-pages/AdminDashboard";
import MainLandingPage from "./pages/MainLandingPage";
import UserAuth from "./pages/user/user-pages/UserAuth";
import Events from "./pages/user/user-pages/Events"
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainLandingPage/>} />
        <Route exact path="/admin" element={<AdminLanding />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route expact path="/user-auth" element={<UserAuth/>}/>
        <Route expact path="/events" element={<Events/>}/>

      </Routes>
    </Router>
  );
}

export default App;
