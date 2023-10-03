
import React, { Component, useState, useEffect } from 'react';

import logo from '../Images/Coloration.png'


function Header() {




    return (
        <div className='header'>
             <img src={logo} />

             <button>LogOut</button>
         

        </div>

    )
}


export default Header;