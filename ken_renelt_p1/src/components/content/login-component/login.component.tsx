import React, { useState } from 'react';

interface LoginComponentProps {
    setView: ( str: 'LOGIN' | 'MAIN-VIEW' | 'ADD-VIEW' | 'APPROVE-VIEW' | 'STATUS-VIEW') => void;
}

export const LoginComponent: React.FC<LoginComponentProps> = (props) => {

    //const [clickInput, setClickInput] = useState(0);
    const [userClicks, setUserClicks] = useState(0);

const LoginSubmit = () => {
    console.log('I am login component');
    // what is the best method to call the server in react
    // find out add it here
};

    return (
        <main>
            <section id="content-component">
                <input type="text" placeholder="user name"></input>
                <input type="password" placeholder="password"></input>
            </section>
            <section>
                <button onClick={() => LoginSubmit()}>Add Click</button>
            </section>
        </main>
    )
}
// export default ClickerComponent;