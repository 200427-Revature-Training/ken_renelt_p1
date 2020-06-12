
import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user-router';
import { db } from '../src/daos/db';
import { reimRouter } from './routers/reimbursment-router';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());

app.set('port', port);

app.use(bodyParser.json());
/*
app.use((request, response, next) => {
    console.log(request);
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/user');
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/reimbursments');
    response.setHeader('Access-Control-Allow-Headers', 'content-type');
    response.setHeader('Access-Control-Allow-Methods', 'PATCH, GET, POST');
    response.setHeader('Access-Control-Allow-Headers', 'content-type, authorization')
    next();
 });
*/

app.use('/user', userRouter);
app.use('/reimbursments', reimRouter);

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

// start listening at this port
app.listen(port, ()=>{
    console.log(`app is listening at http://localhost:${port}`);
})