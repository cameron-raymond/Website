import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import '../../Assets/standardized.css'
import agent_file from './CRaymondResume2019.pdf';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <Link to="/"><p className="title">cameron<span className="hideHead"> raymond</span></p></Link>
                <div style={{
                    display:"flex",
                    minWidth: 100,
                    flex: 0.25,
                    flexDirection: "row",
                    justifyContent: "space-between",   
                    alignItems: 'center'                 
                }}>
                    <a className="subtitle primary"href={agent_file} target="_blank">r<span className="hideLinks">esumé</span></a>
                    <Link to="/about"><a className="subtitle"href={null} target="_blank">a<span className="hideLinks">bout</span></a></Link>
                    <Link to="/contact"> <a className="subtitle"href={null} target="_blank">c<span className="hideLinks">ontact</span></a></Link>
                </div>
                
            </div>
        );
    }
}
export default Header;
