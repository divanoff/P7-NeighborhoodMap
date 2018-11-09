import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Input from '@material-ui/core/Input';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
    list: {
      width: 250,
    }
  };
  
class MenuDrawer extends React.Component {
  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <Input 
          type="text" 
          autoFocus
          placeholder="Filter by name" 
          className="sidebar-input" 
          value={this.props.query} 
          onChange={e => this.props.onFilterPlaces(e.target.value)} />
        <List>
          {this.props.markers && this.props.markers.map((marker, index) => (
            <ListItem button key={index} onClick={e => this.props.onClickMarker(marker)} >
              <ListItemText primary={marker.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={this.props.isDrawerOpen} onClose={this.props.onToggleDrawer}>
          <div
            tabIndex={0}
            role="button"
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}
  
MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuDrawer);