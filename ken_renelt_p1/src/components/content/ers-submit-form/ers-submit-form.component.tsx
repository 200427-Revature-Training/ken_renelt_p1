import * as userRemote from '../../../remotes/user-remote';
import React, { useState, useEffect } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, Box, makeStyles, unstable_createMuiStrictModeTheme } from '@material-ui/core';
import { Ers_reimbursment } from '../../../data-models/Ers_reimbursment';
import { RouteComponentProps, withRouter } from 'react-router';

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
  
  const filestate = {
    file: []
  };

export const ErsSubmitForm: React.FC<RouteComponentProps> = (props) => {

  if(localStorage.getItem('accessToken'))
  {
      console.log('I have a token' + localStorage.getItem('accessToken'));
      if(localStorage.getItem('accessToken')?.length)
      {
          console.log('im inside length');
      }
      else
      {
          console.log('I am pushing to login');
          props.history.push('/login');
      }
  }
  else
  {
      console.log('I must be null' + localStorage.getItem('accessToken'))
      props.history.push('/login');
  }

   const [inputTotalAmount, setInputTotalAmount] = useState('');
   const [inputDescription, setInputDescription] = useState('');
   const [inputTypeId, setInputTypeId] = useState('');

   const [inputreciept, setInputreciept] = useState('');
   const [inputFile, setInputFile] = useState(filestate);
   const classes = useStyles();
   
   const submitReimbursment = async () => {
    console.log('I am ers reimb form component');

    const amountTo:number = parseInt(inputTotalAmount);
    let authorId:any = (localStorage.getItem('userId'));

    const payload:Ers_reimbursment = {
      id:1,
      amount:amountTo,
      author:authorId,
      description:inputDescription,
      submitted: new Date(),
      resolved: new Date(),
      typeID:parseInt(inputTypeId),
      reciept:inputreciept,
      statusId:0
    }

    console.log("we are the inpute type id " + inputTypeId);
    const response = await userRemote.postForm(payload);

    setInputTotalAmount('');
    setInputDescription('');
    setInputTypeId('');
    setInputreciept('');

};

const handleFileUpload = (e:any) => {
  setInputFile({file: e.target.files});
  console.log('settomg the file' + JSON.stringify(filestate.file[0]))
}

const fileTobeSubmitted = async (e:any) => {
  e.preventDefault();
  const formData = new FormData();
 // const fileToBeSent =  filestate.file[0];
  formData.append('file', filestate.file[0]);

const response = await userRemote.saveImage(formData);
console.log("I am logging a file" + JSON.stringify(formData));
// if(file)
 // {
  //  setInputreciept(e.target.files[0])
  //}
}

useEffect(() => {
      
}, []);

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
          <input type="file" onChange={(e) => handleFileUpload(e)}></input>
        </form>
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
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}

export default withRouter(ErsSubmitForm);


