import { db } from './db';
import { Reimbursment, ReimbursmentRow } from '../data-models/reimbursment-model';

export function getAllReimbursments(): Promise<Reimbursment[]>{
    const sql = 'SELECT * FROM ers_reimbursement';

    return db.query<ReimbursmentRow>(sql, []).then(result => {
        const rows:ReimbursmentRow[] = result.rows;
        const allRows:Reimbursment[] = rows.map(row => Reimbursment.from(row));

        return allRows;
    })
}


export function createReimbursment(reim:Reimbursment): Promise<Reimbursment>{
    const sql = '';

    return db.query<ReimbursmentRow>(sql, [
        reim.amount,
        reim.submitted,
        reim.resolved,
        reim.description,
        reim.author,
        reim.resolver,
        reim.statusID,
        reim.typeID
    ]).then(result => result.rows.map(row => Reimbursment.from(row))[0]);
}