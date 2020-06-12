export class User {
    userId: number;
    userName: string;
    userPassword: string;
    userFirstName:string;
    userLastName:string;
    userEmail:string;
    userRollId:number;

    static from(obj: UserRow)
    {
        const user = new User(obj.user_id, obj.user_name, obj.password, obj.user_first_name, obj.user_last_name, obj.user_email, obj.user_roll_id);

        return user;
    }

    constructor(userId:number, userName:string, userPassword:string, userFirstName:string, userLastName:string, userEmail:string, userRollId:number)
    {
        this.userId = userId,
        this.userName = userName,
        this.userPassword = userPassword,
        this.userFirstName = userFirstName,
        this.userLastName = userLastName,
        this.userEmail = userEmail,
        this.userRollId = userRollId
    }
}

export interface UserRow {
    user_id:number;
    user_name:string;
    password:string;
    user_first_name:string;
    user_last_name:string;
    user_email:string;
    user_roll_id:number;
}

export interface userLoginCredentials {
    userPassword:string;
    userName:string;
}