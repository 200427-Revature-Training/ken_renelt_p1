import React from 'react';
import { Ers_reimbursment } from '../../../data-models/Ers_reimbursment';

interface ErsReimbComponentProps {
    ers_reimbursment: Ers_reimbursment;
}

export const ErsReimbComponent: React.FC<ErsReimbComponentProps> = ({ers_reimbursment}) => {

    return(
        <div>
            <div>{ers_reimbursment.description}</div>
            <div>{ers_reimbursment.amount}</div>
            <div>{ers_reimbursment.submitted}</div>
            <div>{ers_reimbursment.resolved}</div>
        </div>
    )
}