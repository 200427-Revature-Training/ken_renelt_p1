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