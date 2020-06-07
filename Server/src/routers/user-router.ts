import express from 'express';
import * as userService from '../services/user-service';
import { User } from '../data-models/user-data-model';

const bcrypt = require('bcrypt');

export const userRouter = express.Router();

const users = [];

userRouter.get('', (request, response, next) => {
    console.log('i am user-router');
   userService.getAllUsers().then(users => {
    response.json(users);
    next();
   }).catch(err => {
       console.log(err);
       response.sendStatus(500);
   });
});

userRouter.post('/register', async (request, response, next) => {

    const salt = 10;

    let hashPassword = '';
     await bcrypt.genSalt(salt, (err, salt) => {
        bcrypt.hash(request.body.userPassword, salt, (err, hash) => {
        hashPassword = hash;

        if(err)
        {
            console.log(err);
            // might need to send err reason
            response.sendStatus(500);
        }
        else{
           // console.log( ' whats my hash' + hashPassword);
            const user:any = {
            userName: request.body.userName,
            userPassword: hashPassword,
            userFirstName: request.body.userFirstName,
            userLastName: request.body.userLastName,
            userEmail: request.body.userLastName,
            userRollId: request.body.userRollId
            };

           // console.log('whats in the body' + user.userPassword);
                userService.createUser(user).then(users => {
                    response.json(users);
                    next();
                }).catch(err => {
                    console.log(err);
                    response.sendStatus(500);
                });
            }
        })
    });
});
/*
    postman settings 
    http://localhost:3000/user/register
     {
        "userName": "erikTheBikeman",
        "userPassword": "biker",
        "userFirstName": "erick",
        "userLastName": "walker",
        "userEmail": "erick@email.com",
        "userRollId": 2
    }
 */

userRouter.get('/login', async (request, response, next) => {
    console.log('I am login route')

        const user:any = {
            userName: request.body.userName,
            userPassword: request.body.userPassword,
            userFirstName: request.body.userFirstName,
            userLastName: request.body.userLastName,
            userEmail: request.body.userLastName,
            userRollId: request.body.userRollId
            };

        userService.loginUser(user).then(users => {

            bcrypt.compare(request.body.userPassword, users.userPassword).then((result) => {
               if(result)
               {
                    response.json(users);
                    console.log("i am user - router = user =" + users);
                    if(users)
                    {
                        console.log('i am a user now' + users.userName);
                    }
                    next();
                }
                else
                {
                    // send status that password was wrong
                    response.sendStatus(500);
                }
            });

        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
        });

});
 //   "userPassword": "$2b$10$J/6fztlQsp7FOvqxdYAdzuWhiXBPyIejO2uEjEcD5FgMD/Z/mXjq2",

/*  this was a good register post
  http://localhost:3000/user/register
{
    "userName": "Postman",
    "userPassword": "manpost",
    "userFirstName": "post",
    "userLastName": "man",
    "userEmail": "post@email.com",
    "userRollId": 1
}

http://localhost:3000/user/login

    {
        "userName": "Postman",
        "userPassword": "manpost"
    }

    http://localhost:3000/user
    returns all users


    userRouter.post('/register', async (request, response, next) => {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashPassword(request.body.userPassword, salt);
    
    console.log( ' whats my hash' + hashPassword);
    const user:any = {
       userName: request.body.userName,
       userPassword: hashPassword,
       userFirstName: request.body.userFirstName,
       userLastName: request.body.userLastName,
       userEmail: request.body.userLastName
    };

    console.log('whats in the body' + request.body.user);
    
   userService.createUser(user).then(users => {
    response.json(users);
    next();
   }).catch(err => {
       console.log(err);
       response.sendStatus(500);
   });
});


userRouter.get('/login', async (request, response, next) => {

    const saltLogin = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashPassword(request.body.userPassword, saltLogin);


    const user:any = {
        userName: request.body.userName,
        userPassword: hashPassword,
        userEmail: request.body.userLastName
     };

    console.log('whats in the body' + request.body.user);
    const salt = await bcrypt.genSalt(10);


   userService.loginUser(user).then(users => {
    response.json(users);
    console.log("i am user - router = user =" + users);
    if(users)
    {
        console.log('i am a user now' + users.userName);
    }
    next();
   }).catch(err => {
       console.log(err);
       response.sendStatus(500);
   });
});

 */

 
