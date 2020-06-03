import express from 'express';
import * as ReimbService from '../services/reimbursment-service';

export const reimRouter = express.Router();

const reimbursments = [];

reimRouter.get('', (request, response, next) => {
    ReimbService.getAllReimbursments().then(reimbursments => {
        response.json(reimbursments);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
})

reimRouter.post('', (request, response, next) => {
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