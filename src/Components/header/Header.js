import React from 'react';
import './header.css'
class Header extends React.Component {
    render() {
        return (
            <div
                style={{
                    display:"flex",
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 10,
                    paddingBottom: 0 ,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginLeft: 30,
                    marginRight: 30,
                    border: 2,
                    borderColor:"transparent",
                    borderBottomColor: "#8e8d8a",
                    borderStyle: 'solid',
                    zIndex: 10000
                    
                }}
                >
                <p >cameron raymond</p>
                <div style={{
                    display:"flex",
                    flex: 0.25,
                    flexDirection: "row",
                    justifyContent: "space-between",                    
                }}>
                    <a href="https://github.com/cameron-raymond"><p>github</p></a>
                    <a href="https://www.linkedin.com/in/cameron-raymond/"><p>linkedIn</p></a>
                </div>
                
            </div>
        );
    }
}
export default Header;
