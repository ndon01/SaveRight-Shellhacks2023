import PageNotFound from './Views/Errors/PageNotFound';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './Styles/Base.css';
import './Styles/App.css';

import LandingPage from './Views/Static/LandingPage/LandingPage';
import Login from './Views/Authorization/Login/Login';
import Register from './Views/Authorization/Register/Register';

import Home from './Views/Authorized/Home/Home'

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { userContext } from './Context/UserContext';

import axios from 'axios';

import GlobalConfig from "./Util/Config";



function App() {

  const [username, setUsername] = useState('')
  const [authToken, setToken] = useState('')
  
  const value = useMemo(() => ({
    username, authToken, setUsername, setToken
  }), [username, authToken])

  useEffect(() => {
    var lstoken = localStorage.getItem("token")
  
    if(lstoken && username == "") {
      axios.get(GlobalConfig.SaveRightAPIURL + "/userInfo/",{headers:{Authorization:lstoken}} ).then((data) => {
        if (data.status === 200) {
          localStorage.setItem("userdata", data.data)
          setUsername(data.data.username)
          setToken(lstoken)
        } else {
          localStorage.removeItem("token")
        }
      }).catch(console.log)
    }
  })

  return (
    <>
      <userContext.Provider value={value}>
      <BrowserRouter>
        <Routes>

          {
            authToken == "" &&  <>
                  <Route path="/" element={<LandingPage/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
                </>
              || <>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Home/>} />
                    <Route path="/register" element={<Home/>} />
                    <Route path="/home" element={<Home/>} />
            </>
          }

          <Route path="*" element={<PageNotFound/>} />
        </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
