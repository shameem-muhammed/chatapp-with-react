import './App.css';
import ChatAppBase from './components/screens/ChatAppBase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={ChatAppBase} />
      </Routes>
    </Router>
  );
}

export default App;
