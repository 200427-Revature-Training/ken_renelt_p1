
import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user-router';
import { db } from '../src/daos/db';

const app = express();

const port = process.env.PORT || 3000;

app.set('port', port);

app.use(bodyParser.json());
app.use('/user', userRouter);


process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

// start listening at this port
app.listen(port, ()=>{
    console.log(`app is listening at http://localhost:${port}`);
})