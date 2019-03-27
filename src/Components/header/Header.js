import React from 'react';
import './header.css'
import '../../Assets/standardized.css'
import agent_file from './CRaymondResume2019.pdf';

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
                    paddingLeft: 20,
                    paddingRight: 20,
                    zIndex: 10000
                    
                }}
                >
                <p className="title">cameron<span className="hideHead"> raymond</span></p>
                <div style={{
                    display:"flex",
                    minWidth: 100,
                    flex: 0.25,
                    flexDirection: "row",
                    justifyContent: "space-between",   
                    alignItems: 'center'                 
                }}>
                    <a className="subtitle primary"href={agent_file} target="_blank">r<span className="hideLinks">esumé</span></a>
                    <a className="subtitle"href={null} target="_blank">a<span className="hideLinks">bout</span></a>
                    <a className="subtitle"href={null} target="_blank">c<span className="hideLinks">ontact</span></a>
                </div>
                
            </div>
        );
    }
}
export default Header;
