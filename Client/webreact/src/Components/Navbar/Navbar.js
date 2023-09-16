import React from 'react'
import './Style.css'

function Navbar() {
  return (
    <nav className="navbarwrapper">
      <div>
        <button>Home</button>
        <button>Budget</button>
        <button>Learn</button>
      </div>
      <div>
        <button>Settings</button>
        <button>Profile</button>
      </div>
    </nav>
  
  )
}

export default Navbar