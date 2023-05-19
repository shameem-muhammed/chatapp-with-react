import React, {useRef} from 'react'

function AddFiles({addFile}) {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
      };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const url = URL.createObjectURL(selectedFile);
        console.log(selectedFile)
        addFile(selectedFile);
      };
  return (
    <div id='add-files-main-div'>
        <ul className='settings-list'>
            <li className='settings-item'>
                <button onClick={() => handleButtonClick()}>Photos or Videos</button>
                <input type="file" hidden ref={fileInputRef} onChange={(event) => handleFileChange(event)} />
            </li>
            <li className='settings-item'>
                <button >Files</button>
            </li>
            
        </ul>
    </div>
  )
}

export default AddFiles