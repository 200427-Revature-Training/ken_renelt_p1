import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { RouteComponentProps, withRouter } from 'react-router';
import { User } from '../../../data-models/user-data-model';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));

export const NavComponent:React.FC<RouteComponentProps> = (props) => {
    
        const classes = useStyles();
      
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
        const user:User = {
            userName: '',
            userEmail: '',
            userFirstName: '',
            userLastName: '',
            userId:1,
            userPassword: '',
            userRollId: 1
        }
        const userName = (user.userName) ? user.userName : 'Guest';
        return (
       <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)} 
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={() =>setAnchorEl(null)}
                  >
                    <MenuItem onClick={() => props.history.push('/user')}>Profile</MenuItem>
                    <MenuItem onClick={() => props.history.push('/form')}>Form submit</MenuItem>
                  </Menu>

                </div>
                <Typography variant="h6" >
                WELCOME {userName}
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      );
    }


const mapDispatchToProps = {};

export default withRouter(NavComponent);
