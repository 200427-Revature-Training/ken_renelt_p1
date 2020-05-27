import { db } from '../daos/db';
import { User, UserRow } from '../data-models/user-data-model';

export function getAllUsers(): Promise<User[]>{
    const sql = 'SELECT * FROM ers_users';

    return db.query<UserRow>(sql, []).then(result => {
        const rows:UserRow[]  = result.rows;
        const allUsers:User[] = rows.map(row => User.from(row));
      //  console.log(rows);
        return allUsers;
    });
}