import express, { response } from 'express';
import * as ReimbService from '../services/reimbursment-service';

const jwt = require('jsonwebtoken');

export const reimRouter = express.Router();

const reimbursments = [];
const secretKey = 'justabunchofcharstolist';


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

reimRouter.get('', (request, response, next) => {
    ReimbService.getAllReimbursments().then(reimbursments => {
        response.json(reimbursments);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
})

/*
reimRouter.get('', authenticateToken, (request, response, next) => {
    ReimbService.getAllReimbursments().then(reimbursments => {
        response.json(reimbursments);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
})
*/


reimRouter.get('/:id', authenticateToken, (request, response, next) => {
    const id = +request.params.id;
    ReimbService.getReimbursmentForUser(id).then(reimbursments => {
        response.json(reimbursments);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
})

reimRouter.post('', authenticateToken, (request, response, next) => {
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

reimRouter.patch('', authenticateToken, (request, respons, next) => {
    const reimb = request.body;
    ReimbService.patchReimbursment(reimb)
    .then(newItem => {
        response.json(newItem);
    }).catch(err => {
        response.sendStatus(500);
    }).finally(() => {
        next();
    })
});
