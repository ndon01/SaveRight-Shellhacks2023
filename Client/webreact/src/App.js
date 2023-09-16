import HomePage from './Views/Authorized/Home/Home';
import PageNotFound from './Views/Errors/PageNotFound';
import { Routes, Route } from 'react-router-dom';
import './Styles/Base.css';
import './Styles/App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );
}

export default App;
