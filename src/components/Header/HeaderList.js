import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import GitIcon from '@material-ui/icons/Code';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const styles = theme => ({

});

function FolderList(props) {
    return (
        <div>
            <List>
                <a href="https://github.com/cameron-raymond" style={{textDecoration: "none"}}>

                    <ListItem>
                        <Avatar>
                            <GitIcon />
                        </Avatar>
                        <ListItemText primary="GitHub" />

                    </ListItem>
                </a>
                <a href="https://www.linkedin.com/in/cameron-raymond/" style={{textDecoration: "none"}}>

                <ListItem>
                    <Avatar>
                        <WorkIcon />
                    </Avatar>
                    <ListItemText primary="LinkedIn" />
                </ListItem>
                </a>
            </List>
        </div>
    );
}

FolderList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);