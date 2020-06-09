
import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, Box, makeStyles } from '@material-ui/core';
import { Form } from 'react-bootstrap';

//interface LoginComponentProps {
 //   setView: ( str: 'LOGIN' | 'MAIN-VIEW' | 'ADD-VIEW' | 'APPROVE-VIEW' | 'STATUS-VIEW') => void;
//}

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
  
export const ErsSubmitForm: React.FC = () => {

   const [inputTotalAmount, setInputTotalAmount] = useState('');
   const [inputDescription, setInputDescription] = useState('');
   const [inputTypeId, setInputTypeId] = useState('');

   const [inputreciept, setInputreciept] = useState('');

   const classes = useStyles();
    const submitReimbursment = () => {
    console.log('I am ers reimb form component');
    // what is the best method to call the server in react
    // find out add it here
};

return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          ERS  Submition Form
        </Typography>
        <Typography>
            {new Date().toUTCString()}
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Total Amount"
            name="amount"
            autoComplete="amount"
            value={inputTotalAmount}
            autoFocus
            onChange={(e) => setInputTotalAmount(e.target.value) }
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            value={inputDescription}
            name="description"
            label="description"
            type="description"
            id="description"
            autoComplete="description"
            onChange={(e) => setInputDescription(e.target.value) }
          />
            <TextField
            variant="outlined"
            value={inputTypeId}
            margin="normal"
            fullWidth
            required
            name="type-id"
            label="type-id"
            type="type-id"
            id="type-id"
            autoComplete="type-id"
            onChange={(e) => setInputTypeId(e.target.value) }
          />
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            value={inputreciept}
            required
            name="reciept"
            label="reciept"
            type="reciept"
            id="reciept"
            autoComplete="reciept"
            onChange={(e) => setInputreciept(e.target.value) }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => submitReimbursment()}
          >
            Submition
          </Button>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}
// export default ClickerComponent;


