import React from 'react'

function UserSettings() {
  return (
    <div id='user-settings-div'>
        <ul className='settings-list'>
            <li className='settings-item'>
                <button >mark as read</button>
            </li>
            <li className='settings-item'>
                <button >pin to top</button>
            </li>
            <li className='settings-item'>
                <button >mute</button>
            </li>
            <li className='settings-item'>
                <button >report</button>
            </li>
            <li className='settings-item'>
                <button >block</button>
            </li>
        </ul>
    </div>
  )
}

export default UserSettings