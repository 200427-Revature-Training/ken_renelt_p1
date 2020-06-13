import express, { response } from 'express';
import * as ReimbService from '../services/reimbursment-service';

const jwt = require('jsonwebtoken');

export const reimRouter = express.Router();

const reimbursments = [];
const secretKey = 'justabunchofcharstolist';


const authenticateToken = (req, res, next) => {
     console.log('am i verifying auth' + req.headers.authorization);
  //  console.log('am i verifying req' +JSON.stringify( req));
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null)
        return res.sendStatus(401);

        console.log('token was not null');
    jwt.verify(token, secretKey, (err, user) => {
        //console.log('am i verified');
        if(err){
            console.log('auth err = ' + err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

reimRouter.get('', (request, response, next) => {
   // console.log('get request b4 auth');

   if(!authenticateToken)
    return response.sendStatus(403);
    //console.log('get request after auth');

    ReimbService.getAllReimbursments().then(reimbursments => {
        response.json(reimbursments);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

reimRouter.get('/:id',  (request, response, next) => {
    if(!authenticateToken)
    return response.sendStatus(403);

     const id = +request.params.id;
    ReimbService.getReimbursmentForUser(id).then(reimbursments => {
        response.json(reimbursments);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
})

reimRouter.post('', (request, response, next) => {
    if(!authenticateToken)
    return response.sendStatus(403);

    const reimb = request.body;
    ReimbService.createReimbursment(reimb)
    .then(newItem => {
        response.json(newItem);
    }).catch(err => {
        // console.log('err');
        response.sendStatus(500);
    }).finally(() => {
        next();
    })
});

reimRouter.patch('', (request, response, next) => {

    if(!authenticateToken)
    return response.sendStatus(403);

   // console.log('i am trying to patch');
    const reimb = request.body;
    ReimbService.patchReimbursment(reimb)
    .then(newItem => {
        response.json(newItem);
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    }).finally(() => {
        next();
    })
});
