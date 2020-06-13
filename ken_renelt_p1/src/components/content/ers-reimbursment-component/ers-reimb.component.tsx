import React, { useState, useEffect } from 'react';
import { Ers_reimbursment } from '../../../data-models/Ers_reimbursment';
import './ers-reimbursment.component.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { Toolbar, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import * as userRemote from '../../../remotes/user-remote';

interface ErsReimbComponentProps {
    ers_reimbursment: Ers_reimbursment;
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

export const ErsReimbComponent: React.FC<ErsReimbComponentProps> = ({ers_reimbursment}) => {

    const managerButton = localStorage.getItem('userRole');


    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
      
    useEffect(() => {
        showApproveButton();
        showDenyButton()
      }, []);

    const submitionDate:string = new Date(ers_reimbursment.submitted).toUTCString();
    const resolvedDate:string = new Date(ers_reimbursment.resolved).toUTCString();
   // const name:string = ers_reimbursment.author;

   const approveButtonHandler = async () => {
    const payload = {
        id: ers_reimbursment.id,
        resolver_id: localStorage.getItem('userId'),
        resolved_date: new Date(),
        status_id: 1
    }

    const response = await userRemote.approveTicket(payload).then(() => {
        console.log('sent approval');
    } 
    );
   }

   const denyButtonHandler = () => {

   }
   
    const showApproveButton = () => {

        if(managerButton && managerButton == '1') 
        {
            console.log('i am manager');
            return (
                 <button onClick={() => approveButtonHandler()} className="approveButton">Approve</button> 
            );
        }
    }

    const showDenyButton = () => {

        if(managerButton && managerButton == '1') 
        {
            console.log('i am manager');
            return (
                 <button className="denyButton">Deny</button> 
            );
        }
    }

    return(

        <div id="ers-list">

<TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Submit Date</TableCell>
            <TableCell align="right">Resolved Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow >
              <TableCell align="right">{ers_reimbursment.description}</TableCell>
              <TableCell align="right">{ers_reimbursment.amount}</TableCell>
              <TableCell align="right">{ers_reimbursment.submitted}</TableCell>
              <TableCell align="right">{ers_reimbursment.resolved}</TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>

        <Toolbar className="reimb-toolbar">
            <div>
        <button className="viewButton" onClick={() => setModalVisible(true)}>Click to View</button>
        {  showApproveButton() }
        {  showDenyButton() }
        </div>
        </Toolbar>
        <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                <Modal.Header>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control value={ers_reimbursment.description} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control  value={ers_reimbursment.amount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>submitted :</Form.Label>
                            <Form.Control value={submitionDate}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>resolved status:</Form.Label>
                            <Form.Control value={resolvedDate} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalVisible(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
        
    )
}
