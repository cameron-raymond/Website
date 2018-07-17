import React from 'react';
import PropTypes from 'prop-types';
import HeaderList from './HeaderList'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  }
};

function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="none">
        <Toolbar>
          <div className={classes.flex}>
            <Typography variant="title" color="inherit" >
              Cameron Raymond
          </Typography>
            <Typography variant="subheading" color="inherit">
              Computer Science
          </Typography>
            <Typography variant="subheading" color="inherit">
              Political Studies
          </Typography>
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