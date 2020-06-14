/* istanbul ignore file */
import { db } from './db';
import { Reimbursment, ReimbursmentRow } from '../data-models/reimbursment-model';

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

    const sql = 'INSERT INTO ers_reimbursement (reimb_amount, reimb_submitted, reimb_description, reimb_author, reimb_type_id, reimb_status_id) \
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

    return db.query<ReimbursmentRow>(sql, [
        reim.amount,
        reim.submitted,
        reim.description,
        reim.author,
        reim.typeID,
        2
    ]).then(result => result.rows.map(row => Reimbursment.from(row))[0]);
}

// update
// used for approval needs help works in dbeaver
export function patchReimbursment(reim:any): Promise<Reimbursment>{
    const sql = 'UPDATE ers_reimbursement set reimb_resolved = $1, reimb_status_id = $2, reimb_resolver = $3 WHERE reimb_id = $4';

    console.log('sending patch for reimb dao' + JSON.stringify(reim));

    return db.query<ReimbursmentRow>(sql, [
        reim.resolved_date,
        reim.status_id,
        reim.resolver_id,
        reim.id
    ]).then(result => result.rows.map(row => Reimbursment.from(row))[0]).catch((e) => {
        console.log("this is my error"+ e);
        return undefined;
    })
}

export function getReimbursmentApproved(): Promise<Reimbursment[]> {
    console.log('get all approved');
    const sql = 'SELECT * FROM ers_reimbursement WHERE reimb_status_id = 1';

    return db.query<ReimbursmentRow>(sql, []).then(result => {
        const rows:ReimbursmentRow[] = result.rows;
        const allRows:Reimbursment[] = rows.map(row => Reimbursment.from(row));

        return allRows;
    })
}

export function getReimbursmentNeedAppoval(): Promise<Reimbursment[]> {
    console.log('get all need approval');
    const sql = 'SELECT * FROM ers_reimbursement WHERE reimb_status_id = 2';

    return db.query<ReimbursmentRow>(sql, []).then(result => {
        const rows:ReimbursmentRow[] = result.rows;
        const allRows:Reimbursment[] = rows.map(row => Reimbursment.from(row));

        return allRows;
    })
}
/*
reimb_id
reimb_amount integer,
reimb_submitted TimeStamp,
reimb_resolved timestamp,
reimb_description varchar(250),
reimb_author integer REFERENCES ers_users(user_id),
reimb_resolver integer REFERENCES ers_users(user_id),
reimb_status_id integer REFERENCES ers_reimbursement_status(reimb_status_id),
reimb_type_id integer REFERENCES ers_reimbursement_type(id)
*/