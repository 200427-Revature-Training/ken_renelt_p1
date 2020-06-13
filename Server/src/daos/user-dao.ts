/* istanbul ignore file */

import { db } from './db';
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

export function registerUser(user:User): Promise<User>{
  const sql = 'INSERT INTO ers_users (user_name, password, user_first_name, user_last_name, user_email, user_roll_id) Values ($1, $2, $3, $4, $5, $6)';

  return db.query<UserRow>(sql, [
    user.userName,
    user.userPassword,
    user.userFirstName,
    user.userLastName,
    user.userEmail,
    user.userRollId
  ]).then(result => result.rows.map(row => User.from(row))[0]).catch((e) => {
    console.log(e);
     return undefined;
  }
  );
}

export function loginUser(user:User):Promise<User> {
  const sql = 'SELECT * from ers_users Where user_name=$1';

  return db.query<UserRow>(sql, [
    user.userName
  ]).then(result => result.rows.map(row => User.from(row))[0]);
}