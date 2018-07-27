import React, { Component } from 'react';
import './Header.css'
import picture from '../../assets/cameronRaymond.jpg'
import Avatar from '@material-ui/core/Avatar';


const styles = {
    
    bigAvatar: {
      width: 100,
      height: 60,
    },
  };

class Header extends Component {

    render() {
        return (

            <div style={{ display: 'flex',flexDirection: 'row', alignItems: 'center' }}>

                <div style={{ flexDirection: "column", alignItems: "flex-start", padding: 0, margin: 0 }}>
                    <h2 className="appTitle" style={{ fontWeight: 300 }} >
                        Cameron Raymond
</h2>
                    <h3 className="headerList" style={{ fontWeight: 100 }}>
                        Computer Science
</h3>
                    <h3 className="headerList" style={{ fontWeight: 100 }} >
                        Political Studies
</h3>
                </div>
            </div>
        );
    }
}

export default Header;

