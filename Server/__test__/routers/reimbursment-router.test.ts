import express, { response } from 'express';
import bodyParser from 'body-parser';
import * as reimbService from '../../src/services/reimbursment-service';
import { reimRouter } from '../../src/routers/reimbursment-router';
import request from 'supertest';
import * as authenticateToken from '../../src/services/reimbursment-service';
jest.mock('../../src/services/reimbursment-service');

const mockAuthenticateToken = authenticateToken as any;
const mockReimbSevice = reimbService as any;

const app = express();

app.use(bodyParser.json());
app.use('/reimbursments', reimRouter);

// let token;
// const bearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InBlZXdlZSIsInVzZXJQYXNzd29yZCI6ImhhaGEiLCJpYXQiOjE1OTE5OTM1MzZ9.WJ5zUYTgkF3l-FWctHMD0Ungdm1Hl6gKx5D3M8cslx0';

/*
beforeAll((done) => {
    request(app)
    .post('/login')
    .send({ userName:'peewee', userPassword:'haha'})
    .end((err, res) => {
        token = res.body.token;
        done();
    })
});
*/

describe('Get it all reimbs manager normal check', async () => {

    test('Returns normal under normal conditions', async () => {
    mockReimbSevice.getAllReimbursments.mockImplementation(async () => ({}));

    const payload =
    {
        "newUser": {
            "userId": 21,
            "userName": "erikTheBikeman",
            "userPassword": "$2b$10$J/6fztlQsp7FOvqxdYAdzuWhiXBPyIejO2uEjEcD5FgMD/Z/mXjq2",
            "userFirstName": "erick",
            "userLastName": "walker",
            "userEmail": "walker",
            "userRollId": 2
        }
    }

    await request(app)
    .get('/reimbursments')
    .send(payload)
   // .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('content-type', 'application/json; charset=utf-8');
    });

    test('check throw error', async () => {
        mockReimbSevice.getAllReimbursments.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/reimbursments')
            .expect(500);
    });
});


describe('Get all Reimbursments for just user', async () => {
    test('login ', async () => {
    mockReimbSevice.getReimbursmentForUser.mockImplementation(async () => ({}));

    const payload =
    {
        "newUser": {
            "userId": 21,
            "userName": "erikTheBikeman",
            "userPassword": "$2b$10$J/6fztlQsp7FOvqxdYAdzuWhiXBPyIejO2uEjEcD5FgMD/Z/mXjq2",
            "userFirstName": "erick",
            "userLastName": "walker",
            "userEmail": "walker",
            "userRollId": 2
        }
    }

    await request(app)
    .get('/reimbursments/id')
    .send(payload)
    .expect(200)
    });

    test('check throw error', async () => {
        mockReimbSevice.getReimbursmentForUser.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/reimbursments/id')
            .expect(500);
    });

});

describe('Post new create reimbursment', async () => {
    test('post new create reimbursment', async () => {
    mockReimbSevice.createReimbursment.mockImplementation(async () => ({}));

    await request(app)
    .post('/reimbursments')
    .expect(200)
    });

    test('check throw error', async () => {
        mockReimbSevice.createReimbursment.mockImplementation(async () => {throw new Error()});
        await request(app)
            .post('/reimbursments')
            .expect(500);
    });
});

describe('patch reimbursment', async () => {
    test('patch reimbursment', async () => {
    mockReimbSevice.patchReimbursment.mockImplementation(async () => ({}));

    const payload =
    {
        "newUser": {
            "status_id": 2,
            "resolved_date": new Date(),
            "resolver_id": 24,
            "id": 10,
            "userRollId": 2
        }
    }

    await request(app)
    .patch('/reimbursments')
    .send(payload)
    .expect(200)
    });

    test('check throw error', async () => {
        mockReimbSevice.patchReimbursment.mockImplementation(async () => {throw new Error()});
        await request(app)
            .patch('/reimbursments')
            .expect(500);
    });
});


// Define POST route
app.post('/test-upload', (request, response) => {
    const form = new multiparty.Form();
      form.parse(request, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
          const path = files.file[0].path;
          const buffer = fs.readFileSync(path);
          const type = fileType(buffer);
          const timestamp = Date.now().toString();
          const fileName = `bucketFolder/${timestamp}-lg`;
          const data = await uploadFile(buffer, fileName, type);
          return response.status(200).send(data);
        } catch (error) {
          return response.status(400).send(error);
        }
      });
  });