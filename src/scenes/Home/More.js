import React, { Component, NavLink } from 'react';
import Card from '../../components/BasicCard/BasicCard'
import Scatter from '../../components/Graphs/BackgroundGraphs/BackgroundScatter'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Email from '@material-ui/icons/Email';
import ResumeLink from '../../components/PDF/Pdf.js'
import Resume from '@material-ui/icons/List';


class More extends Component {
    render() {
        return (
            <Card title={"Let's Get In Touch"}
                background={<Scatter />}
                color={"#E9E9E9"}
                backgroundColor={"#4C5C6A"}            >
            If you have any questions about me, or would like to reach out, feel free.
                <List>
                    <a href="mailto:CameronRaymond534@gmail.com" style={{ textDecoration: "none" }}>

                        <ListItem>
                            <Avatar>
                                <Email />
                            </Avatar>
                            <ListItemText color="#E9E9E9" primary="CameronRaymond534@gmail.com" />

                        </ListItem>
                    </a>
                        
                </List>
                <ListItem>
                            <Avatar>
                                <Resume />
                            </Avatar>
                            <ListItemText><ResumeLink/></ListItemText>

                        </ListItem>
            </Card>
        );
    }
}





export default More;
