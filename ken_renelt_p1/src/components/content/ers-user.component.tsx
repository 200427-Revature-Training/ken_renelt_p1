import React , { useState } from 'react';
import { User } from '../../data-models/user-data-model';
import { Ers_reimbursment } from '../../data-models/Ers_reimbursment';
import { ErsReimbListComponent } from './ers-reimb-list-component/ers-reimb-list.component';
import { ErsSubmitForm } from './ers-submit-form/ers-submit-form.component';
import './ers-user.component.css';

interface userProps {
    user: User,
    listofReimb:Ers_reimbursment[],
    setView: ( str: 'LOGIN' | 'MAIN-VIEW' | 'ADD-VIEW' | 'APPROVE-VIEW' | 'STATUS-VIEW') => void;
}
export const UserComponent: React.FC<userProps> = (userProps) => {
    const [view, setView] = useState('MAIN-VIEW');
    const userName = (userProps.user.userName) ? userProps.user.userName : "login";
    const [reimbursments, setReimbursments] = useState<Ers_reimbursment[]>(userProps.listofReimb);
    
    const addReimbusment = (reimb: Ers_reimbursment) => {
        setReimbursments([...reimbursments, reimb]);
    }
   
    //const getAllReimbForUser = () => {
     //   peopleRemote.getAllPeople().then(people => {
     //       setUsers(people);
     //   });        
 //   }
//  <h3>Welcome {userName}</h3> // add this to header
    return (
        
    <main id="user-comp" className="container">
       
        <div className="row">
            <div id="list-side" className="col-sm">
                <ErsReimbListComponent setView={setView} reimbursments={reimbursments}></ErsReimbListComponent>
            </div>
            <div id="form-side" className="col-sm">
                <ErsSubmitForm></ErsSubmitForm>
            </div>
        </div>
    </main>
    );
}