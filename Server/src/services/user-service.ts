import { User } from '../data-models/user-data-model';
import * as userDao from '../daos/user-dao';

export function getAllUsers(): Promise<User[]> {
    console.log('i am user service');
    return userDao.getAllUsers();
}