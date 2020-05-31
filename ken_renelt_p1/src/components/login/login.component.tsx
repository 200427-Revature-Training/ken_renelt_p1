import React, { useState } from 'react';
// import './clicker-component.css';

let numColor:string = '';

const ClickerComponent: React.FC = () => {

    //const [clickInput, setClickInput] = useState(0);
    const [userClicks, setUserClicks] = useState(0);

const ClickSubmitter = () => {
    setUserClicks(userClicks + 1);
    //setClickInput(0);
    if(userClicks >= 10)
        numColor = 'clickerNum';
};

    return (
        <main>
            <section id="content-component">
                <input type="text" placeholder="user name"></input>
                <input type="password" placeholder="password"></input>
            </section>
            <section>
             <h2 className={numColor}>{userClicks}</h2>
            </section>
        <section>
            <button onClick={() => ClickSubmitter()}>Add Click</button>

        </section>
        </main>
    )
}

export default ClickerComponent;