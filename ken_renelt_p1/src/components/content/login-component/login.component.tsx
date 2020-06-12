import React, { useState, useEffect } from 'react';
import { CssBaseline, Button, Box, Avatar, Typography, TextField, makeStyles, Container } from '@material-ui/core';
import * as userRemote from '../../../remotes/user-remote';
import { RouteComponentProps, withRouter } from 'react-router';


interface logInProps {
  setView: ( str: 'LOGIN' | 'USER' | 'FORM' | 'APPROVE-VIEW' | 'STATUS-VIEW') => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
 const LoginComponent: React.FC<RouteComponentProps> = (props) => {

  const classes = useStyles();

    useEffect(() => {
    }, []);

    const [view, setView] = useState('LOGIN');
    const [inputUserName, setInputUserName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    let isConnected = false;
    const loginUser = async () => {
      const payload = {userName: inputUserName, userPassword: inputPassword};
        const response = await userRemote.login(payload);
        setInputPassword('');
        setInputUserName('');


        isConnected = (localStorage.getItem('accessToken') != '') ? true : false;
        console.log('am i connected = ' + isConnected);
       // setView('LOGGEDIN');
        //renderComponents();
        props.history.push('/reimbursments');
        console.log('push it ');
      }
  
      return (
          <Container className='hidden' component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={inputUserName}
                id="username"
                label="User Name"
                name="user-name"
                autoComplete="user-name"
                autoFocus
                onChange={(e) => setInputUserName(e.target.value) }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={inputPassword}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setInputPassword(e.target.value) }
              />
            </form>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => loginUser() }
              >
                Sign In
              </Button>
          </div>
          <Box mt={8}>
          </Box>
        </Container>
      
        );
  };

export default withRouter(LoginComponent);