import { Reimbursment } from '../data-models/reimbursment-model';
import * as reimBDao from '../daos/reimbursment-dao'


export function getAllReimbursments(): Promise<Reimbursment[]> {
    return reimBDao.getAllReimbursments();
}

export function getReimbursmentForUser(userID:number): Promise<Reimbursment[]> {
    return reimBDao.getReimbursmentForUser(userID);
}
export function createReimbursment(reim:Reimbursment): Promise<Reimbursment> {
    return reimBDao.createReimbursment(reim);
}

export function patchReimbursment(reim:Reimbursment): Promise<Reimbursment>{
    return reimBDao.patchReimbursment(reim);
}

export function getReimbursmentApproved(): Promise<Reimbursment[]> {
    return reimBDao.getReimbursmentApproved();
}

export function getReimbursmentNeedAppoval(): Promise<Reimbursment[]> {
    return reimBDao.getReimbursmentNeedAppoval();
}