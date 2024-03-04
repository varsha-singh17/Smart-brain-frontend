import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm=({onInputChange,onSubmit})=>{
    return(
        <div>
            <p className='f3 '>
                {'This Magic Brain will detect faces in your picture. Give it a try!'}

            </p>
            <div className='form center'> 
                <input type='tex' className='  ma2 f3 w-70 br-pill b--light-blue shadow-2' onChange={onInputChange}/>
                <button className=' br-pill ma2 w-20 grow f4 link ph3 pv2 dib black bg-light-pink shadow-2' onClick={onSubmit}>Detect</button>
            </div>

        </div>



    )
}
export default ImageLinkForm