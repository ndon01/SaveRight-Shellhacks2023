import React, { useContext } from 'react'
import './Style.css'

import { userContext } from '../../Context/UserContext'

function Navbar() {
  const value = useContext(userContext)
  return (
    <nav className="navbarwrapper">
      <div>
        <button>Home</button>
        <button>Budget</button>
        <button>Learn</button>
      </div>
      <div>
        {value.token}
      </div>
    </nav>
  
  )
}

export default Navbar