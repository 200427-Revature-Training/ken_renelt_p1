import React from 'react';
import { Ers_reimbursment } from '../../../data-models/Ers_reimbursment';
import { ErsReimbComponent } from '../../content/ers-reimbursment-component/ers-reimb.component';

interface ErsReimbProps {
   // setView: ( str: 'LOGIN' | 'MAIN-VIEW' | 'ADD-VIEW' | 'APPROVE-VIEW' | 'STATUS-VIEW') => void;
    reimbursments: Ers_reimbursment[];
}

export const ErsReimbListComponent: React.FC<ErsReimbProps> = (props) => {


    const renderReimListComponents = () => {
        return props.reimbursments.map(reim => {
            return (<ErsReimbComponent ers_reimbursment={reim} ></ErsReimbComponent>)
        })
    }

    return(
        <div>
            {renderReimListComponents()}
        </div>
    );
}