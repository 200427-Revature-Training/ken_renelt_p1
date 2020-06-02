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