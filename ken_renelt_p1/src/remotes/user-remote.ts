import { Ers_reimbursment } from '../data-models/Ers_reimbursment';
import { internalAxios } from './internal-axios';
import { userLoginCredentials, User } from '../data-models/user-data-model';


interface UserProfile {
    ersReimbs: Ers_reimbursment[];
}

interface UserLoginInterface{
    accessToken:{accessToken:string},
    newUser:User
}

export const getAllReim = async () => {
    console.log('get all');
    const response = await internalAxios.get<Ers_reimbursment[]>('/reimbursments');
    return response.data;
}

export const getApproved = async () => {
    console.log('get approved');
    try {
            const response = await internalAxios.get<Ers_reimbursment[]>('/reimbursments/approved/1');
    return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }

}

export const getNeedsApproval = async () => {
    console.log('get needs approval');
    const response = await internalAxios.get<Ers_reimbursment[]>('/reimbursments/denied/2');
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
    localStorage.setItem('userName', response.data.newUser.userName);
    return response;
}

export const postForm = async (payload:Ers_reimbursment) => {
    const response = await internalAxios.post<Ers_reimbursment>('/reimbursments', payload);
    return response;
}

export const approveTicket = async (payload:any) => {
    const response = await internalAxios.patch<Ers_reimbursment>('/reimbursments', payload);
    return response;
}

//https://kenrevatureproject.s3.us-east-2.amazonaws.com/ticket1.png
export const saveImage = async (payload:any) => {
    console.log("lets see what we are sending here" + JSON.stringify(payload));
    const response = await internalAxios.post(`/reimbursments/file-upload`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        return response;
      }).catch(error => {
        console.log('do something with your error' + error);
      });
      return response;
}