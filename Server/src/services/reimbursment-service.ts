import { Reimbursment } from '../data-models/reimbursment-model';
import * as reimBDao from '../daos/reimbursment-dao'


export function getAllReimbursments(): Promise<Reimbursment[]> {
    console.log('I am now reimbursment service');
    return reimBDao.getAllReimbursments();
}

export function createReimbursment(reim:Reimbursment): Promise<Reimbursment> {
    return reimBDao.createReimbursment(reim);
}