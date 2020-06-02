import express, { response } from 'express';
import * as reimService from '../../services/reimbursment-service/reimbursment-service';
export const reimbursmentRouter = express.Router();

const reim = [];

reimbursmentRouter.get('', (request, response,next) => {
    reimService.getAllReimbursments().then(reim => {
        response.json(reim);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    })
})