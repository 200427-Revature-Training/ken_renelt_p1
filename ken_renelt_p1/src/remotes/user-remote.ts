import { Ers_reimbursment } from '../data-models/Ers_reimbursment';
import { internalAxios } from './internal-axios';
import { userLoginCredentials, User } from '../data-models/user-data-model';
import { timeEnd } from 'console';


interface UserProfile {
    ersReimbs: Ers_reimbursment[];
}

interface UserLoginInterface{
    accessToken:{accessToken:string},
    newUser:User
}
//export const getUser = async (id:number) => {
//    const reimbs = await Axios.get<UserProfile>('/user');
//    return response;
//}

export const getAllReim = async () => {
    console.log('get all');
    const response = await internalAxios.get<Ers_reimbursment[]>('/reimbursments');
    return response.data;
}

export const getUserReim = async () => {
    console.log('get user reim')
    const tempID = localStorage.getItem('userId');
    const url = '/reimbursments/' + tempID;
    console.log(url);
    const response = await internalAxios.get<Ers_reimbursment[]>(url);
    return response.data;
}

  export const login = async (userCredentials: userLoginCredentials) => {

    const response = await internalAxios.post<UserLoginInterface>('/user/login', userCredentials);
    const userRole = response.data.newUser.userRollId;
    let userRoleString = userRole.toString();
    localStorage.setItem('accessToken', response.data.accessToken.accessToken)
    localStorage.setItem('userRole', userRoleString);
    localStorage.setItem('userId', response.data.newUser.userId.toString());
    return response;
}

export const postForm = async (payload:Ers_reimbursment) => {
    const response = await internalAxios.post<Ers_reimbursment>('/reimbursments', payload);
    return response;
}


// userID 21 = erikTheBikeman 