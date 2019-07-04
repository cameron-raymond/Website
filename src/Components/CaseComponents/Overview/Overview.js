import React, { PureComponent } from 'react';
import SmallList from './SmallList'
import reveal from '../../HOC/scrollReveal/Reveal'
import styles from './overview.module.css'

class Overview extends PureComponent {
    render() {
        let headers = this.props.headers
        let el = this.props.elements
        return (
            <div className={styles.oContainer}>
                {headers.map((val,index) => <SmallList elements={el[index]}>{val}</SmallList>)}
            </div>
        );
    }
}

export default reveal(Overview);
