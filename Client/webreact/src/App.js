import PageNotFound from './Views/Errors/PageNotFound';
import { Routes, Route } from 'react-router-dom';
import './Styles/Base.css';
import './Styles/App.css';

import LandingPage from './Views/Static/LandingPage/LandingPage';
import Login from './Views/Authorization/Login/Login';
import Register from './Views/Authorization/Register/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );
}

export default App;
