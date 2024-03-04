import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './Brain.jpeg';
import './Logo.css';
const Logo = () => {
    return (
        <Tilt>
      <div  className='Tilt shadow-1 pa1' style={{ height: '100px' , width: '100px' }} options={{max :20}}>
        <img className='br-100' src={brain} alt="Smartbrain"/>
      </div>
    </Tilt>


    );
}
export default Logo;