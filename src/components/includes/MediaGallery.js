import React from 'react'
import MediaFiles from '../../data/MediaFiles'

function MediaGallery({closeMedia}) {
    let renderMediaFiles = () => {
        return MediaFiles.map((file) => (
            <li key={file.id}>
                <div className='media-file-image'>
                    <img className='mediafile-img' src={file.mediaurl} alt="media file" />
                </div>
            </li>
        ))
    }
  return (
    <div id='media-gallery'>
        <div className='close-icon-div'>
            <button onClick={() => closeMedia()}>
                <div className='close-icon'>
                    <img src={require('../../assets/icons/close-icon.svg').default} alt="" />
                </div>
            </button>
            
        </div>
        
        <div className='media-file-list-div'>
            <ul className='media-file-list'>
                {renderMediaFiles()}
            </ul>
        </div>
    </div>
  )
}

export default MediaGallery