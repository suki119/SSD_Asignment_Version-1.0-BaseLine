import React, { Component } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';


class home extends Component {
    render() {
        return (
            <div className='main-wrapper'>
                <div className='app-header'>
                    <Header />

                </div>
                <div className='app-body'>
                    <div className='body-wrapper'>
                        <div className='app-sidebar'>
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default home;