import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLanding from "./pages/admin-pages/AdminLanding";
import AdminDashboard from "./pages/admin-pages/AdminDashboard";
import MainLandingPage from "./pages/MainLandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainLandingPage/>} />
        <Route exact path="/admin" element={<AdminLanding />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
