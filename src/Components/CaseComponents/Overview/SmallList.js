import React, { PureComponent } from 'react';
import '../../../Assets/standardized.css'
import './overview.css'

class SmallList extends PureComponent {
    handleList = (arr) => {
        return arr.map((val, index) => {
            if (index < arr.length - 1) {
                return <p className="text reduceListSpace">&nbsp;&nbsp;{val}<span className="hideComma">,</span></p>
            }
            return <p className="text reduceListSpace">&nbsp;&nbsp;{val}</p>
        }
        );
    }

    render() {
        return (
            <div>
                <p className="textEmphasis reduceListSpace" style={{fontWeight: 400}}>{this.props.children}</p>
                <div className="removeLineBreak">
                    {this.props.elements ? this.handleList(this.props.elements) : null}
                </div>
            </div>
        );
    }
}

export default SmallList;
