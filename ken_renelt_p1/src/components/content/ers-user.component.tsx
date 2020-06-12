import React , { useState, useEffect } from 'react';
import { User } from '../../data-models/user-data-model';
import { Ers_reimbursment } from '../../data-models/Ers_reimbursment';
import { ErsReimbListComponent } from './ers-reimb-list-component/ers-reimb-list.component';
import './ers-user.component.css';
import { Typography } from '@material-ui/core';
import * as userRemote from '../../remotes/user-remote';

const reimbList:Ers_reimbursment[] = [];

interface userProps {
    user: User,
    // listofReimb:Ers_reimbursment[],
    //setView: ( str: 'LOGIN' | 'MAIN-VIEW' | 'ADD-VIEW' | 'APPROVE-VIEW' | 'STATUS-VIEW') => void;
}
export const UserComponent: React.FC = () => {
   // const [view, setView] = useState('MAIN-VIEW');
    //const userName = (userProps.user.userName) ? userProps.user.userName : "login";
    const [reimbursments, setReimbursments] = useState<Ers_reimbursment[]>(reimbList);
    
    const addReimbusment = (reimb: Ers_reimbursment) => {
        setReimbursments([...reimbursments, reimb]);
    }

    useEffect(() => {
        addReim();
    },[]);


    let userRole = localStorage.getItem('userRole'); 

    const addReim = () => {    
        console.log('whats my userRole = ' + userRole);
        if(userRole != '')
        {
            if(userRole == '1')
            {
                userRemote.getAllReim().then(reim => {
                return  setReimbursments(reim);
                })
 
            }
            else
            {
                console.log('user roll anything else');
                userRemote.getUserReim().then(reim => {
                    return setReimbursments(reim);
                })
            }
        }
    }
    return (
        
    <section id="user-comp" className="container">
        <div className="rowc">
            <Typography>Click to view your ticket</Typography>
            <div id="list-side" className="col-sm">
                <ErsReimbListComponent reimbursments={reimbursments}></ErsReimbListComponent>
            </div>
        </div>
    </section>
    );
}