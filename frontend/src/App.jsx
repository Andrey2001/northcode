import InputData from './components/InputData';
import AboutPage from './components/AboutPage.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/UI/NavBar';

function App() {
  const formStyle = {
    backgroundColor: "#E2DBD3",
    minHeight: "100vh"
  };

  return (
      <Router>
          <div style={formStyle}>
          <NavBar />
          <Routes>
            <Route path="/home" element={<InputData />} /> 
            <Route path="/about" element={<AboutPage />} />
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
          </div>
      </Router>
  );
}

export default App;
