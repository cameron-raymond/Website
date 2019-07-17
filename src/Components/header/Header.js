import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMessageSquare, FiClipboard } from 'react-icons/fi';
import ReactGA from 'react-ga';
import styles from './header.module.css'
import resume from '../../Assets/CRaymondResume2020.pdf';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isHide: false,
            style: styles.header
        }
    }

    
    hideBar = () => {
       const { isHide,style } = this.state
        console.log(this.state)
       window.scrollY > this.prev ?
       !isHide && this.setState({ isHide: true,style:styles.header+' '+styles.navUp })
       :
       isHide && this.setState({ isHide: false,style:styles.header });

       this.prev = window.scrollY;
       console.log(this.state)

    }

    componentDidMount(){
        window.addEventListener('scroll', this.hideBar);
    }

    componentWillUnmount(){
         window.removeEventListener('scroll', this.hideBar);
    }
    render() {
        
        return (
            <div className={this.state.style}>
                <Link to="/"><p className="textEmphasis onHov">cameron<span className={styles.hideHead}> raymond</span></p></Link>
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
                    <p className="textEmphasis onHov"><span className={styles.hideIcons}><FiClipboard /></span><span className={styles.hideLinks}>resumé</span></p>
                    </ReactGA.OutboundLink>
                    <Link to="/about"><p className="text onHov" ><span className={styles.hideIcons}><FiUser /></span><span className={styles.hideLinks}>about</span></p></Link>
                    <Link to="/contact"> <p className="text onHov" ><span className={styles.hideIcons}><FiMessageSquare /></span><span className={styles.hideLinks}>contact</span></p></Link>
                </div>

            </div>
        );
    }
}
export default Header;
