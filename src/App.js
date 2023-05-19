import './App.css';
import ChatAppBase from './components/screens/ChatAppBase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/screens/Signup';
import Signin from './components/screens/Signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={ChatAppBase} />
        <Route path='signup/' Component={Signup} />
        <Route path='signin/' Component={Signin} />
      </Routes>
    </Router>
  );
}

export default App;
