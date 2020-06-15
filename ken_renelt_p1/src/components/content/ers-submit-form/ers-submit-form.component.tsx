import * as userRemote from '../../../remotes/user-remote';
import React, { useState, useEffect } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, Box, makeStyles, Select } from '@material-ui/core';
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
  

export const ErsSubmitForm: React.FC<RouteComponentProps> = (props) => {

  let fileToBeSent:File;
  let fileName = '';
  let fileType;

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

   const classes = useStyles();
   
   const submitReimbursment = async () => {
    console.log('I am ers reimb form component');

    fileTobeSubmitted();
    const amountTo:number = parseInt(inputTotalAmount);
    let authorId:any = (localStorage.getItem('userId'));

    const idToBeSubmitted = (parseInt(inputTypeId) < 5) ? parseInt(inputTypeId) : 4;
    const payload:Ers_reimbursment = {
      id:1,
      amount:amountTo,
      author:authorId,
      description:inputDescription,
      submitted: new Date(),
      resolved: new Date(),
      typeID:idToBeSubmitted,
      reciept:fileToBeSent.name,
      statusId:0
    }

    console.log("we are the inpute type id " + JSON.stringify(payload));
    const response = await userRemote.postForm(payload);

    setInputTotalAmount('');
    setInputDescription('');
    setInputTypeId('');
  
    fileName = '';
    fileType = '';
};

const handleInputId = (e:any) =>
{
  const idToBeSubmitted = (parseInt(inputTypeId) < 5) ? inputTypeId : '4';
  setInputTypeId(idToBeSubmitted);
}
const onFileChange = (files: FileList | null) => { 

  console.log(files);
  if(files)
  {
    fileToBeSent = files[0];
    let fileParts = files[0].name.split('.');
    fileName = fileParts[0];
    fileType = fileParts[1];
  }
       
  console.log("whats the file name = " + fileToBeSent.name);
}; 

const handleFileUpload = (e:any) => {
  console.log(e.uploadInput);
}

const handleInputChange = (e:any) => {
console.log('setting input ' + e);
  setInputTypeId(e);

}
const fileTobeSubmitted = async () => {
  const formData = new FormData();
 
  formData.append('file', fileToBeSent);

  const response = await userRemote.saveImage(formData);
  console.log("whats the file name = " + fileToBeSent.name);
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
            aria-readonly
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
            onChange={(e) => handleInputId(e.target.value) }
            
          />
          <Select
          native
          value={inputTypeId}
          onChange={(e) => handleInputChange(e.target.value)}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={1}>Lodging</option>
          <option value={2}>Travel</option>
          <option value={3}>Food</option>
          <option value={3}>Food</option>
        </Select>
          <input type="file" onChange={(e) => onFileChange(e.target.files)}></input>
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


