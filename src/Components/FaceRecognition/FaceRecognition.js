import React from 'react';
import './FaceRecognition.css'

const FaceRecognition=({ box,imageUrl})=>{
    return(
        <div className='center  ma'>
            <div className='absolute mt2 '>
            <img classname='br4 shadow-2' id='inputimage' src={imageUrl} alt='' width='500px' height='auto'/>
            <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div>
    )
}
export default FaceRecognition