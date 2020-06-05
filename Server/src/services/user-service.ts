import { User } from '../data-models/user-data-model';
import * as userDao from '../daos/user-dao';

export function getAllUsers(): Promise<User[]> {
    console.log('i am user service');
    return userDao.getAllUsers();
}

export function createUser(user:User): Promise<User>{
    console.log('user service')
    return userDao.registerUser(user);
}

export function loginUser(user:User): Promise<User>{
    console.log('user login service');
    return userDao.loginUser(user);
}