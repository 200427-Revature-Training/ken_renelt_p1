import React, { useState } from 'react';
import { User } from '../../../data-models/user-data-model';
import { ErsReimbComponent } from '../ers-reimbursment-component/ers-reimb.component';
import { Ers_reimbursment } from '../../../data-models/Ers_reimbursment';

interface RequestAllComponentProps {
    //setView: ( str: 'LOGIN' | 'MAIN-VIEW' | 'ADD-VIEW' | 'APPROVE-VIEW' | 'STATUS-VIEW') => void;
    reimbursments: Ers_reimbursment[];
}

export const RequestAllComponent: React.FC<RequestAllComponentProps> = (props) => {

    const [view, setView] = useState('MAIN-VIEW');

    const showAllRequests = () => {
      return props.reimbursments.map(ers => {
            return (<ErsReimbComponent ers_reimbursment={ers} />)
        })
    }

    return (
        <main>
            { showAllRequests }
        </main>
    )
}