import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Form from './components/Form';
import Card from './components/Cards';
import Landing from './pages/Landing';
import Login from './components/Login';
import SignUp from './components/SignUp';
import DashBoard from './pages/DashBoard';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/dashboard" element={<DashBoard/>} />

      </Routes>
    </Router>
  );
}

export default App;
