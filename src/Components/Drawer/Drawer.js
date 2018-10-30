import Drawer from 'react-drag-drawer'
import './DrawerStyle.css'
import React, { Component } from 'react';

export default class myDawer extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { open: false };
    }

    toggle = (event) => {
        event.stopPropagation()
        let { toggle } = this.state

        this.setState({ toggle: !toggle })
    }

    render() {

        return (
            <React.Fragment>
                <React.Fragment onClick={this.toggle}>
                    {this.props.children}
                </React.Fragment>
                <Drawer
                    className="modal"
                    open={this.state.open}
                    onRequestClose={this.toggle}
                >
                    <div>Hey Im inside the drawer!</div>
                </Drawer>
            </React.Fragment>
        )
    }
}