import React from 'react';
import PropTypes from 'prop-types';
import HeaderList from './HeaderList'
import LeftHeader from './LeftHeader'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import "./Header.css"
import Typography from '@material-ui/core/Typography';
import { Avatar } from '../../../node_modules/@material-ui/core';
import picture from '../../assets/cameronRaymond.jpg'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="none">
        <Toolbar>
          <div className={classes.flex} >
            <LeftHeader/>
          </div>
          <HeaderList />
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);