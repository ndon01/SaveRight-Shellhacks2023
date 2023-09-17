import PageNotFound from './Views/Errors/PageNotFound';
import { Routes, Route } from 'react-router-dom';
import './Styles/Base.css';
import './Styles/App.css';

import LandingPage from './Views/Static/LandingPage/LandingPage';
import Login from './Views/Authorization/Login/Login';
import Register from './Views/Authorization/Register/Register';

import Home from './Views/Authorized/Home/Home'

import { createContext, useEffect, useMemo, useState } from 'react';

import { userContext } from './Context/UserContext';
import PieChartComponent from './Components/piechart';

function App() {
  const [username, setUsername] = useState('')
  const [authToken, setToken] = useState('')
  const value = useMemo(() => ({
    username, authToken, setUsername, setToken
  }), [username, authToken])

  return (
    <userContext.Provider value={value}>
      <Routes>

        {useEffect(() => {
          if (authToken == "") {
            var token = localStorage.getItem("token")
            if (token) {
              setToken(token)
            } else {
              return <>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
              </>
            }
          }
          
          return <>
                  <Route path="/" element={<Home/>} />
                  <Route path="/login" element={<Home/>} />
                  <Route path="/register" element={<Home/>} />
                  <Route path="/home" element={<Home/>} />
          </>
        }, [authToken,])}
        <Route path="/pieChart" element={<PieChartComponent/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
