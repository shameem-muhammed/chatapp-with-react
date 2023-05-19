import React from 'react'

function ThreeDotSettings({openChatDetails}) {
  return (
    <div id='threedot-settings-div'>
        <ul className='settings-list'>
            <li className='settings-item'>
                <button onClick={() => openChatDetails()} >Chat Details</button>
            </li>
        </ul>
    </div>
  )
}

export default ThreeDotSettings