import { Ers_reimbursment } from "../../data-models/Ers_reimbursment";
import * as reimbursmentDao from '../../daos/ersDao/ersDao'


export function getAllReimbursments(): Promise<Ers_reimbursment[]> {
    console.log('i am reimbursment service');
    return reimbursmentDao.getAllReimbursments();
}