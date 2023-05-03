import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { authentication } from '../../app/stores/commonStore';


const Navbar = () => {
    const [user] = useAuthState(authentication);

    const picture = user?.photoURL;
    const name = user?.displayName;


return (
    <div className='navbar'>
        <span className='logo'>
            Simple Chat
        </span>
        <div className='user'>
            <img alt='' src={`${picture}`}/>
            <span>{name}</span>
        </div>
    </div>
)
}

export default Navbar;