import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
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
    state = {
      left: this.props.isDrawerOpen
    };
  
    toggleDrawer = (open) => () => {
      // this.setState({
      //   left: open,
      // });
      this.props.onToggleDrawer();
    };

    //TODO: wire up the click on an item in the sidebar
    handleClick(event) {
        console.log(event.target.value);
    }

    //TODO: wire up the filter by name
    handleFilter(event) {
        console.log(event.target.value);
    }
  
    render() {
      const { classes } = this.props;
  
      const sideList = (
        <div className={classes.list}>
          <Input type="text" placeholder="Filter by name" className="sidebar-input" onChange={this.handleFilter} />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      );
  
      return (
        <div>
          {/* <Button onClick={this.toggleDrawer()}><i className="material-icons">menu</i></Button> */}
          <Drawer open={this.props.isDrawerOpen} onClose={this.props.onToggleDrawer}>
            <div
              tabIndex={0}
              role="button"
              // onClick={this.toggleDrawer()}
              // onKeyDown={this.toggleDrawer()}
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
  

// class MenuDrawer extends React.Component {
//   state = {
//     left: false,
//   };

//   toggleDrawer = (open) => () => {
//     this.setState({
//       left: open,
//     });
//   };

//   handleClick(event) {
//       console.log(event.target.innerHTML);
//   }

//   render() {

//     const sideList = (
//       <div>
//         <input type="text" className="input-sidebar" placeholder="Filter by name" />
//         <ul>
//           {['Inbox', 'Starred', 'Send email in your browser to your friend', 'Drafts', 'All mail', 'Trash', 'Spam'].map((text, index) => (
//             <li><button>{text}</button></li>
//           ))}
//         </ul>
//       </div>
//     );

//     return (
//       <div className="sidebar">
//         <button onClick={this.toggleDrawer(true)}><i className="material-icons">menu</i></button>
//         <Drawer
//           open={this.state.left}
//           onClose={this.toggleDrawer(false)}
//         >
//           <div
//             tabIndex={0}
//             role="menu"
//           >
//             {sideList}
//           </div>
//         </Drawer>
//       </div>
//     );
//   }
// }

// export default MenuDrawer;
