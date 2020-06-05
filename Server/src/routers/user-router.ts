import express from 'express';
import * as userService from '../services/user-service';


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

userRouter.post('/register', (request, response, next) => {
    const user = request.body;
    console.log('whats in the body' + request.body.user);

   userService.createUser(user).then(users => {
    response.json(users);
    next();
   }).catch(err => {
       console.log(err);
       response.sendStatus(500);
   });
});


userRouter.get('/login', (request, response, next) => {
    const user = request.body;
    console.log('whats in the body' + request.body.user);

   userService.loginUser(user).then(users => {
    response.json(users);
    next();
   }).catch(err => {
       console.log(err);
       response.sendStatus(500);
   });
});

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
 */
