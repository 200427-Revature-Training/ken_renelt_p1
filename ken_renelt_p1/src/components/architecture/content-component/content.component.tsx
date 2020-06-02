import React, { useState } from 'react';
import { LoginComponent } from '../../content/login-component/login.component';
import { Ers_reimbursment } from '../../../data-models/Ers_reimbursment';
import { ErsReimbListComponent } from '../../content/ers-reimb-list-component/ers-reimb-list.component';

export const childViews = {
    login: 'LOGIN',
    mainView: 'MAIN-VIEW',// VIEW THE LIST OF REIMBURSMENTS
    addView: 'ADD-VIEW', // VIEW TO ADD A NEW REIMBURSMENT
    approveView: 'APPROVE-VIEW',
    statusView: 'STATUS-VIEW'// view for finance manager to view by status
}

const starterPack:Ers_reimbursment[] = [{
    id:1,
    amount:0.99,
    description: 'Your first reimbursment',
    resolved: new Date(),
    submitted: new Date()
},
{
    id:2,
    amount:0.99,
    description: 'Your first reimbursment',
    resolved: new Date(),
    submitted: new Date()
},
{
    id:3,
    amount:0.99,
    description: 'Your first reimbursment',
    resolved: new Date(),
    submitted: new Date()
},
{
    id:4,
    amount:0.99,
    description: 'Your first reimbursment',
    resolved: new Date(),
    submitted: new Date()
}]

interface LoginComponentProps {
    setView: ( str: 'LOGIN' | 'MAIN-VIEW' | 'ADD-VIEW' | 'APPROVE-VIEW' | 'STATUS-VIEW') => void;
}

export const ContentComponent: React.FC = () => {
    const [view, setView] = useState('MAIN-VIEW');
    const [reimbursments, setReimbursments] = useState<Ers_reimbursment[]>(starterPack);
    
    const addReimbusment = (reimb: Ers_reimbursment) => {
        setReimbursments([...reimbursments, reimb]);
    }

    const getCurrentView = () => {
    
        console.log('wahts my view = '+ view);
        switch (view)
        {
            case childViews.login: return <LoginComponent setView={setView} />;
            case childViews.mainView: return <ErsReimbListComponent setView={setView} reimbursments={reimbursments}></ErsReimbListComponent>
        }
    }

    return (
        <main>
            {getCurrentView()}
        </main>
    )
}
