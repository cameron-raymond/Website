import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import '../../../Assets/standardized.css'
import './footer.css'

class Footer extends PureComponent {
  render() {
    return (
      <div className="footer">
        <div className="footInfo">
          <p className="subtitle primary">&copy; 2019 cameron raymond</p>
          <a href="mailto:c.raymond@queensu.ca" className="subtitle">c.raymond@queensu.ca</a>
          <a href="https://linkedin.com/in/cameron-raymond/" className="subtitle">linkedIn</a>
          <a href="hhttps://github.com/cameron-raymond" className="subtitle">github</a>
        </div>

        <Link to={this.props.to ? this.props.to : '/'}>
          <p className="serif viewNext onHov">{this.props.linkTitle ? this.props.linkTitle : "what else ya got" }</p>
          <p className="serif viewNextMobile onHov">{this.props.linkTitleMobile ? this.props.linkTitleMobile : "next"}</p>
        </Link>
      </div>
    )
  }
}
export default Footer;



