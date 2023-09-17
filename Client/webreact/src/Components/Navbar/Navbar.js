import React, { useContext } from 'react'
import './Style.css'

import { userContext } from '../../Context/UserContext'

function Navbar() {
  const value = useContext(userContext)
  console.log(value)
  return (
    <nav className="navbarwrapper">
      <div>
      Hi, <b>{value.username}</b>.
      </div>
      <div>
        <button onClick={function() {
          localStorage.clear()
          value.setToken('')
          value.setUsername('')
        }}>logout</button>
      </div>
    </nav>
  
  )
}

export default Navbar