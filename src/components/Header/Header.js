import React from 'react';
import PropTypes from 'prop-types';
import HeaderList from './HeaderList'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import "./Header.css"
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
          <div className={classes.flex} >
            <div style={{  flexDirection: "column", alignItems: "flex-start", padding: 0, margin: 0}}>
              <h2 className="appTitle" style={{ fontWeight: 300 }}>
                Cameron Raymond
          </h2>
              <h3 className="headerList" style={{ fontWeight: 100 }}>
                Computer Science
          </h3>
              <h3  className="headerList"style={{ fontWeight: 100 }} >
                Political Studies
          </h3>
            </div>
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