import React, { PureComponent } from 'react';
import Typist from 'react-typist';
import '../../../Assets/standardized.css'
import './overview.css'


class SmallList extends PureComponent {
    handleList = (arr) => {
        return arr.map((val, index) => {
            if (index < arr.length-1){
                return  <p className="subtitle reduceListSpace">&nbsp;&nbsp;{val}<span className="hideComma">,</span></p>
            }
            return <p className="subtitle reduceListSpace">&nbsp;&nbsp;{val}</p>
        }
        );
    }

    render() {
        return (
            <div>
                <p className="subtitle primary reduceListSpace">{this.props.children}</p>
                <div >
                    {this.props.elements ? this.handleList(this.props.elements) : null}
                </div>
            </div>
        );
    }
}

export default SmallList;
