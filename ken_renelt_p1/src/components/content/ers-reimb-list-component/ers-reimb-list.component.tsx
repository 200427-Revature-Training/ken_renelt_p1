import React from 'react';
import { Ers_reimbursment } from '../../../data-models/Ers_reimbursment';
import { ErsReimbComponent } from '../../content/ers-reimbursment-component/ers-reimb.component';

interface ErsReimbProps {
    reimbursments: Ers_reimbursment[];
}

export const ErsReimbListComponent: React.FC<ErsReimbProps> = (props) => {
    const renderReimListComponents = () => {
        console.log('how many = ' + props.reimbursments.length);
        return props.reimbursments.map(reim => {
            return (<ErsReimbComponent key={reim.id} ers_reimbursment={reim} ></ErsReimbComponent>)
        })
    }

    return(
        <div>
            {renderReimListComponents()}
        </div>
    );
}