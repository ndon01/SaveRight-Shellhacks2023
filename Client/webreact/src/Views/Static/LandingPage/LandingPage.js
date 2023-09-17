import React from 'react'
import './Style.css'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className=''>
        {/*Title*/}
        <div>
          Save Right
        </div>
        {/*Buttons*/}
        <div>
           {/*Sign into an Existing Account*/}
            <div>
              <Link to={'/Login'}>Sign in to an Existing Account</Link>
            </div>
            {/*Create an Account*/}
            <div>
              <Link to={'/Register'}>Create an Account</Link>
            </div>  
        </div>
    </div>
  )
}

export default LandingPage