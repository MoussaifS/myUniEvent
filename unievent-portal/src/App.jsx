import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import Form from './components/Form';
import Card from './components/Cards';
import Landing from './pages/Landing';
import Login from './components/Login'
function App() {

  return (
    <div>
      <Login/>
    </div>
  )
}

export default App
