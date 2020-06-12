import React from 'react';
import { Ers_reimbursment } from '../../../data-models/Ers_reimbursment';
import './ers-reimbursment.component.css';

interface ErsReimbComponentProps {
    ers_reimbursment: Ers_reimbursment;
}

export const ErsReimbComponent: React.FC<ErsReimbComponentProps> = ({ers_reimbursment}) => {

    return(
        <div id="ers-list">
            <div>{ers_reimbursment.description}</div>
            <div>{ers_reimbursment.amount}</div>
            <div>{ers_reimbursment.submitted}</div>
            <div>{ers_reimbursment.resolved}</div>
            <button id="listButton">Status</button>
        </div>
    )
}