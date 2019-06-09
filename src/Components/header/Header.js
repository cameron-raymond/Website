import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMessageSquare, FiClipboard } from 'react-icons/fi';
import ReactGA from 'react-ga';

import './header.css'
import '../../Assets/standardized.css'
import resume from '../../Assets/CRaymondResume2020.pdf';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <Link to="/"><p className="textEmphasis onHov">cameron<span className="hideHead"> raymond</span></p></Link>
                <div style={{
                    display: "flex",
                    minWidth: 100,
                    flex: 0.25,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center'
                }}>
                    <ReactGA.OutboundLink
                        eventLabel="clickedResume"
                        to={resume}
                    >
                    <p className="text primary onHov"><span className="hideIcons"><FiClipboard /></span><span className="hideLinks">resumé</span></p>
                    </ReactGA.OutboundLink>
                    <Link to="/about"><p className="text onHov" ><span className="hideIcons"><FiUser /></span><span className="hideLinks">about</span></p></Link>
                    <Link to="/contact"> <p className="text onHov" ><span className="hideIcons"><FiMessageSquare /></span><span className="hideLinks">contact</span></p></Link>
                </div>

            </div>
        );
    }
}
export default Header;
