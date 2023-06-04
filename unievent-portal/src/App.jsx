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

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Form/>} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
