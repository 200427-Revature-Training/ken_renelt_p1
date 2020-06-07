import express from 'express';
import * as userService from '../services/user-service';
import { User } from '../data-models/user-data-model';
import { ifError } from 'assert';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const userRouter = express.Router();

const secretKey = 'justabunchofcharstolist';

const users = [];

const authenticateToken = (req, res, next) => {
    console.log('am i verifying' + req.headers.authorization);

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null)
        return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        console.log('am i verified');
        if(err){
            console.log(err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}
// need to add the authenticateToken to this
userRouter.get('', authenticateToken, (request, response, next) => {

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

userRouter.post('/login', async (request, response, next) => {
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
                    const accessToken = jwt.sign(user, secretKey);
                    response.json(accessToken);
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


// npm jsonwebtoken
/*
 http://localhost:3000/user/
    {
        "userName": "erikTheBikeman",
        "userPassword": "biker",
        "userFirstName": "erick",
        "userLastName": "walker",
        "userEmail": "erick@email.com",
        "userRollId": 2
    }
    under the headers section after you log in change the value to the token the login gives you
key =Authorization
value = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImVyaWtUaGVCaWtlbWFuIiwidXNlclBhc3N3b3JkIjoiYmlrZXIiLCJ1c2VyRmlyc3ROYW1lIjoiZXJpY2siLCJ1c2VyTGFzdE5hbWUiOiJ3YWxrZXIiLCJ1c2VyRW1haWwiOiJ3YWxrZXIiLCJ1c2VyUm9sbElkIjoyLCJpYXQiOjE1OTE1NTI3MzV9.ay7Of1lFpPR1tk_UKywIs7t4flnj9jc6_RLH7yXFcHo


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

this was a good register post
  http://localhost:3000/user/register
{
    "userName": "Postman",
    "userPassword": "manpost",
    "userFirstName": "post",
    "userLastName": "man",
    "userEmail": "post@email.com",
    "userRollId": 1
}



    http://localhost:3000/user
    returns all users


    this is a good login from postman
    http://localhost:3000/user/login
    {
        "userName": "erikTheBikeman",
        "userPassword": "biker",
        "userFirstName": "erick",
        "userLastName": "walker",
        "userEmail": "erick@email.com",
        "userRollId": 2
    }
 */

 
