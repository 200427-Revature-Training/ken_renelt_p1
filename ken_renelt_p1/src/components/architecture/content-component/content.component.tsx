import React, { useState } from 'react';
import { LoginComponent } from '../../content/login-component/login.component';

export const childViews = {
    login: 'LOGIN',
    mainView: 'MAIN-VIEW',// VIEW THE LIST OF REIMBURSMENTS
    addView: 'ADD-VIEW', // VIEW TO ADD A NEW REIMBURSMENT
    approveView: 'APPROVE-VIEW',
    statusView: 'STATUS-VIEW'// view for finance manager to view by status
}

interface LoginComponentProps {
    setView: ( str: 'LOGIN' | 'MAIN-VIEW' | 'ADD-VIEW' | 'APPROVE-VIEW' | 'STATUS-VIEW') => void;
}

export const ContentComponent: React.FC = () => {
    const [view, setView] = useState('LOGIN');

    const getCurrentView = () => {
    
        console.log('wahts my view = '+ view);
        switch (view)
        {
            case childViews.login: return <LoginComponent setView={setView} />;
        }
    }

    return (
        <main>
            {getCurrentView()}
        </main>
    )
}
