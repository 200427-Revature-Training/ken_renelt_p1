import { Reimbursment } from '../../src/data-models/reimbursment-model';

describe('testing the data model for reimbursment model', () => {
    test('first reimbursment model test', () => {

        const payload:any = {
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
        expect(Reimbursment.from(payload)).toBeInstanceOf(Reimbursment)
    })
})