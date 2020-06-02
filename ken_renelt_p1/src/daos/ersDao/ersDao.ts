import { db } from '../db';
import { Ers_reimbursment, ErsRow } from '../../data-models/Ers_reimbursment';


export function getAllReimbursments(): Promise<Ers_reimbursment[]> {
    // this will be changed to only id by user id when user id is all set up
    const sql = 'SELECT * from ers_reimbursement';

    return db.query<ErsRow>(sql, []).then(result => {
        
        const rows:ErsRow[] = result.rows;
        const allErs:Ers_reimbursment[] = rows.map(row => Ers_reimbursment.from(row));
        return allErs;
    })
}