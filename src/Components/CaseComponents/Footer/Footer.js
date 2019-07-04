import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import '../../../Assets/standardized.css'
import styles from './footer.module.css'

class Footer extends PureComponent {
  
  render() {
    return (
      <div className={styles.footer}>
      
        <div className={styles.footInfo}>
          <p className="textEmphasis">&copy; 2019 cameron raymond</p>
          <a href="mailto:c.raymond@queensu.ca" className="text">c.raymond@queensu.ca</a>
          <a href="https://linkedin.com/in/cameron-raymond/" className="text">linkedIn</a>
          <a href="https://github.com/cameron-raymond" className="text">github</a>
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



