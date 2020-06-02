import express from 'express';
import * as userService from '../../services/user-service/user-service';

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