import React , { useState } from 'react';
import { User } from '../../data-models/user-data-model';
import { Ers_reimbursment } from '../../data-models/Ers_reimbursment';
import { ErsReimbListComponent } from './ers-reimb-list-component/ers-reimb-list.component';
import './ers-user.component.css';
import { Typography } from '@material-ui/core';

const reimbList:Ers_reimbursment[] = [];

interface userProps {
    user: User,
    listofReimb:Ers_reimbursment[],
    setView: ( str: 'LOGIN' | 'MAIN-VIEW' | 'ADD-VIEW' | 'APPROVE-VIEW' | 'STATUS-VIEW') => void;
}
export const UserComponent: React.FC = () => {
    const [view, setView] = useState('MAIN-VIEW');
    //const userName = (userProps.user.userName) ? userProps.user.userName : "login";
    const [reimbursments, setReimbursments] = useState<Ers_reimbursment[]>(reimbList);
    
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
        
    <section id="user-comp" className="container">
        <div className="rowc">
            <Typography>Click to view your ticket</Typography>
            <div id="list-side" className="col-sm">
                <ErsReimbListComponent setView={setView} reimbursments={reimbursments}></ErsReimbListComponent>
            </div>
        </div>
    </section>
    );
}