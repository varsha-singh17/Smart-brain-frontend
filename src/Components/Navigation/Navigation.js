import React from 'react';

const Navigation=( {onSigninChange,isSignedin})=>{
    if(isSignedin){
    return(
        <nav className='ma0' style={{display:'flex' , justifyContent:'flex-end'}}>
            <p className=' ma0 f3 link dim grow pointer pa2  ' onClick={()=>onSigninChange('signout')}>Sign Out</p>
        </nav>
    )
}
else{
    return(
        <nav className='ma0' style={{display:'flex' , justifyContent:'flex-end'}}>
            <p className=' ma0 f3 link dim grow pointer pa2  ' onClick={()=>onSigninChange('signin')}>Sign In</p>
            <p className=' ma0 f3 link dim grow pointer pa2  ' onClick={()=>onSigninChange('register')}>Register</p>
        </nav>
    )

}
}
export default Navigation