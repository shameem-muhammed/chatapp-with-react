import React from 'react'

function Settings({logOutUser}) {
  return (
    <div id='settings-div'>
        <ul className='settings-list'>
            <li className='settings-item'>
                <button >change theme</button>
            </li>
            <li className='settings-item'>
                <button >user account</button>
            </li>
            <li className='settings-item'>
                <button onClick={() => logOutUser()}>logout</button>
            </li>
        </ul>
    </div>
  )
}

export default Settings