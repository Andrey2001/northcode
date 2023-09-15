import './App.css';
import InputData from './components/InputData';
import ChatBot from './components/ChatBot';
import AboutPage from './components/AboutPage.jsx'
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
        <div>
            <InputData />
            <Routes>
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
