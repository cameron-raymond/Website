import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser,FiMessageSquare ,FiClipboard
} from 'react-icons/fi';
import './header.css'
import '../../Assets/standardized.css'
import agent_file from './CRaymondResume2019.pdf';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <Link to="/"><p className="title onHov">cameron<span className="hideHead"> raymond</span></p></Link>
                <div style={{
                    display:"flex",
                    minWidth: 100,
                    flex: 0.25,
                    flexDirection: "row",
                    justifyContent: "space-between",   
                    alignItems: 'center'                 
                }}>
                    <a className="subtitle primary"href={agent_file}><span className="hideIcons"><FiClipboard/></span><span className="hideLinks">resumé</span></a>
                    <Link to="/about"><p className="subtitle onHov" ><span className="hideIcons"><FiUser/></span><span className="hideLinks">about</span></p></Link>
                    <Link to="/contact"> <p className="subtitle onHov" ><span className="hideIcons"><FiMessageSquare/></span><span className="hideLinks">contact</span></p></Link>
                </div>
                
            </div>
        );
    }
}
export default Header;
