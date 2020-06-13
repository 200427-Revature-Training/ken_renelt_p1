import * as reimbService from '../../src/services/reimbursment-service';
import * as reimbDao from '../../src/daos/reimbursment-dao';
import { Reimbursment } from '../../src/data-models/reimbursment-model';

jest.mock('../../src/daos/reimbursment-dao');

const mockReimbDao = reimbDao as any;

describe ('get all reimbursments', () => {
    test('first test of get all for manager mock dao', async () => {
        //expect.assertions(1);
        mockReimbDao.getAllReimbursments.mockImplementation( async () => {
            //  console.log('This is what mock dao actually calls');
          });

        const result = await reimbService.getAllReimbursments();
    })
})


describe ('get reimbursments for user', () => {
    test('get reim for suer mock dao', async () => {
        //expect.assertions(1);
        mockReimbDao.getReimbursmentForUser.mockImplementation( async () => {
            //  console.log('This is what mock dao actually calls');
          });

        const result = await reimbService.getReimbursmentForUser(24);
    })
})


describe ('create reimbursment ', () => {
    test('create reimbursment mock dao', async () => {
        //expect.assertions(1);
        mockReimbDao.createReimbursment.mockImplementation( async () => {
            //  console.log('This is what mock dao actually calls');
          });

          const payload:Reimbursment = {
            amount:100,
            author: 22,
            description: 'dkjhfaskl',
            id: 22,
            resolved: new Date(),
            resolver: 2,
            statusID: 2,
            submitted: new Date(),
            typeID:2
          }
        const result = await reimbService.createReimbursment(payload);
    })
})

describe ('patch reim for manager', () => {
    test('patch item mock dao, async', async () => {

        mockReimbDao.createReimbursment.mockImplementation( async () => {
            //  console.log('This is what mock dao actually calls');
          });

          const payload:Reimbursment = {
            amount:100,
            author: 22,
            description: 'dkjhfaskl',
            id: 22,
            resolved: new Date(),
            resolver: 2,
            statusID: 2,
            submitted: new Date(),
            typeID:2
          }
        const result = await reimbService.patchReimbursment(payload);
    })
})