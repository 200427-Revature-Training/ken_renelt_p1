import React, { useState } from 'react';
import { Ers_reimbursment } from '../../../data-models/Ers_reimbursment';
import { User } from '../../../data-models/user-data-model';

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

const testUser:User = {
    userName: 'testUser',
    userFirstName: 'user',
    userEmail: 'user@email.com',
    userId:1,
    userRollId: 1,
    userLastName:'testy',
    userPassword: 'noneya'
}

interface ContentComponentProps {
   // setView: ( str: 'LOGIN' | 'MAIN-VIEW' | 'ADD-VIEW' | 'APPROVE-VIEW' | 'STATUS-VIEW') => void;
   user: User
}

//export const ContentComponent: React.FC = () => {
    //const [view, setView] = useState('MAIN-VIEW');
  //  const [reimbursments, setReimbursments] = useState<Ers_reimbursment[]>(starterPack);
  //  const [user, setUser] = useState<User>(testUser);
   // const addReimbusment = (reimb: Ers_reimbursment) => {
  //      setReimbursments([...reimbursments, reimb]);
   // }

    const getCurrentView = () => {
    
       // console.log('wahts my view = '+ view);
      //  switch (view)
      //  {
           // case childViews.login: return <LoginComponent setView={setView} />;
           // case childViews.mainView: return <UserComponent user={user} setView={setView} listofReimb={reimbursments}></UserComponent>
       // }
  //  }

    return (
        <main>
           // {getCurrentView()}
        </main>
    )
}
