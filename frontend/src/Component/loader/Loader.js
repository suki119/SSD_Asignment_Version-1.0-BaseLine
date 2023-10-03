import React, { Component } from 'react';
import RiseLoader from "react-spinners/HashLoader";
import AccountCSS from './account.module.css';

class Loader extends Component {
    render() {
        return (
            <div>
                <div className={AccountCSS.loadercontainer}>


                    <div style={{ position: 'fixed', left: '50%', top: '40%' }}>


                        <RiseLoader
                            sizeUnit={"px"}
                            size={130}
                            color={"#123abc"}
                            loading={true}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default Loader;