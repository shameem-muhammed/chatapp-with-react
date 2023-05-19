import React, {useState} from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../includes/FireBase'
import { useEffect } from 'react'

function AuthDetails() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })

        return () => {
            listen()
        }
    }, [])

    let userSignout = () => {
        signOut(auth).then(() => {
            console.log('sign out successfully')
        }).catch((error) => {
            console.log('something went wrong')
        })
    }
  return (
    <div>{ user ? 
    <>
        <p>signed in as {user.displayName}</p>
        <button onClick={() => userSignout()}>sign out</button>
        {user.photoURL ? <img src={user.photoURL} alt="" /> : null}
    </> : <p>not signed in</p> }</div>
  )
}

export default AuthDetails