import { db } from './db';
import { Reimbursment, ReimbursmentRow } from '../data-models/reimbursment-model';
import { stringify } from 'querystring';

// read
export function getAllReimbursments(): Promise<Reimbursment[]>{
    const sql = 'SELECT * FROM ers_reimbursement';

    return db.query<ReimbursmentRow>(sql, []).then(result => {
        const rows:ReimbursmentRow[] = result.rows;
        const allRows:Reimbursment[] = rows.map(row => Reimbursment.from(row));

        return allRows;
    })
}

// read
export function getReimbursmentForUser(userId:number): Promise<Reimbursment[]>{
    const sql = 'SELECT * FROM ers_reimbursement WHERE reimb_author = $1';

    return db.query<ReimbursmentRow>(sql, [
        userId
    ]).then(result => {
        const rows:ReimbursmentRow[] = result.rows;
        const allRows:Reimbursment[] = rows.map(row => Reimbursment.from(row));

        return allRows;
    })
}

// post
export function createReimbursment(reim:Reimbursment): Promise<Reimbursment>{
    console.log(JSON.stringify(reim));

    const sql = 'INSERT INTO ers_reimbursement (reimb_amount, reimb_submitted, reimb_description, reimb_author, reimb_type_id) \
    VALUES ($1, $2, $3, $4, $5) RETURNING *';

    return db.query<ReimbursmentRow>(sql, [
        reim.amount,
        reim.submitted,
        reim.description,
        reim.author,
        reim.typeID
    ]).then(result => result.rows.map(row => Reimbursment.from(row))[0]);
}

// update
// used for approval needs help works in dbeaver
export function patchReimbursment(reim:Reimbursment): Promise<Reimbursment>{
    const sql = 'UPDATE ers_reimbursement set reimb_resolved = $1, reimb_status_id = $2, reimb_resolver = $3 WHERE reimb_id = $4';

    console.log('sending patch for reimb dao');

    return db.query<ReimbursmentRow>(sql, [
        reim.resolved,
        reim.statusID,
        reim.resolver,
        reim.id
    ]).then(result => result.rows.map(row => Reimbursment.from(row))[0]);
}