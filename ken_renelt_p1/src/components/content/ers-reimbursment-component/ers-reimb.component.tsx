import React from 'react';
import { Ers_reimbursment } from '../../../data-models/Ers_reimbursment';
import './ers-reimbursment.component.css';

interface ErsReimbComponentProps {
    ers_reimbursment: Ers_reimbursment;
}

export const ErsReimbComponent: React.FC<ErsReimbComponentProps> = ({ers_reimbursment}) => {

    const managerButton = localStorage.getItem('userRole');

    const showModal = () => {
        console.log('show me the modal')
    }

    const showComponents = () => {

        if(managerButton && managerButton == '1') 
        {
            console.log('i am manager');
            return (
                 <button id="listButton">Status</button>
            );
        }

    }

    return(
        <div id="ers-list">
        <div>{ers_reimbursment.description}</div>
        <div>{ers_reimbursment.amount}</div>
        <div>{ers_reimbursment.submitted}</div>
        <div>{ers_reimbursment.resolved}</div>
        <button onClick={() => showModal()}></button>
        
        {  showComponents() }
        </div>
    )
}