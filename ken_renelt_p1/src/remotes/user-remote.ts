import { Ers_reimbursment } from '../data-models/Ers_reimbursment';
import { internalAxios } from './internal-axios';
import { userLoginCredentials } from '../data-models/user-data-model';


interface UserProfile {
    ersReimbs: Ers_reimbursment[];
}

//export const getUser = async (id:number) => {
//    const reimbs = await Axios.get<UserProfile>('/user');
//    return response;
//}

export const getAllReim = async () => {
    const response = await internalAxios.get<Ers_reimbursment[]>('/reimbursments');
    return response.data;
}

  export const login = async (userCredentials: userLoginCredentials) => {
    const response = await internalAxios.post('/login', userCredentials);
    return response;
}