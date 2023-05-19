import React, { useState } from 'react'
import {auth, updateprofile} from '../includes/FireBase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

function Signin({currentUser}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate()
    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password).then((userCredintail) => {
            console.log(userCredintail)
            navigate("/")
            
        }).catch((error) => {
            navigate('/signup')
            console.log(error)
        })
    }
  return (
    <div id='login-page-maincontainer'>
        <div className='loginpage-subcontainer'>
            <div className='login-titlediv'>
                <h2>welcome to myspace🚀</h2>
                <h3>LOG IN</h3>
            </div>

            <div className='login-formdiv'>
                <form onSubmit={signIn}>
                    <input type="email" value={email} onChange={((e) => setEmail(e.target.value))} placeholder='enter your email' />
                    <input type="password" value={password} onChange={((e) => setPassword(e.target.value))} placeholder='enter your password' />
                    <div className='submit-button'>
                        <button type='submit'>Log in</button>
                    </div>
                </form>
            </div>
            <div className='login-to-signup-div'>
                <p>or</p>
                <Link to='/signup'>register</Link>
            </div>
        </div>
        
    </div>
  )
}

export default Signin