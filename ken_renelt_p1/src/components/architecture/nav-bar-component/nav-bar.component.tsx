import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles, Menu, MenuItem, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { RouteComponentProps, withRouter } from 'react-router';
import { User } from '../../../data-models/user-data-model';
import './nav-bar.component.css';

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
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

        const logOutButton = () => {
          localStorage.clear();
          props.history.push('/login');
        }

        return (
          <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
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
                    <MenuItem onClick={() => props.history.push('/reimbursments')}>Profile</MenuItem>
                    <MenuItem onClick={() => props.history.push('/form')}>Form submit</MenuItem>
                  </Menu>
              <Typography variant="h6" className={classes.title}>
                Welcome
              </Typography>
             <div className="logOut"> 
               <Button color="inherit"  onClick={() => logOutButton()} >Log Out</Button>
             </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    }

export default withRouter(NavComponent);



/*
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
                    <MenuItem onClick={() => props.history.push('/reimbursments')}>Profile</MenuItem>
                    <MenuItem onClick={() => props.history.push('/form')}>Form submit</MenuItem>
                  </Menu>

                </div>
                <Typography variant="h6" >
                WELCOME 
              </Typography>
              <div  className="logOut">
                <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => logOutButton()}
                      color="inherit"
                    >
                      Log Out
                  
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </div>


*/