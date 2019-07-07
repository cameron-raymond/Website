import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Emoji from '../../../Components/Emoji'
import styles from './footer.module.css'

class Footer extends PureComponent {
  
  render() {
    return (
      <div className={styles.footer}>
      
        <div className={styles.footInfo}>
          <p className="subheading"><Emoji symbol="👨‍🎨"/> and <Emoji symbol="👷‍♂️"/> by me as of July 7, 2019</p>

          <a href="mailto:c.raymond@queensu.ca" className="subheading">c.raymond@queensu.ca</a>
          <a href="https://linkedin.com/in/cameron-raymond/" className="subheading">linkedIn</a>
          <a href="https://github.com/cameron-raymond" className="subheading">github</a>
        </div>

        <Link to={this.props.to ? this.props.to : '/'}>
          <p className={styles.viewNext+" serif onHov"}>{this.props.linkTitle ? this.props.linkTitle : "what else ya got" }</p>
          <p className={styles.viewNextMobile+" serif onHov"}>{this.props.linkTitleMobile ? this.props.linkTitleMobile : "next"}</p>
        </Link>
      </div>
    )
  }
}
export default Footer;



