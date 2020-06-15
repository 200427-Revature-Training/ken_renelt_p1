import React from 'react';
import { mount } from 'enzyme';
import { ErsReimbListComponent } from '../../components/content/ers-reimb-list-component/ers-reimb-list.component';
import { ErsReimbComponent } from '../../components/content/ers-reimbursment-component/ers-reimb.component';
import { Ers_reimbursment } from '../../data-models/Ers_reimbursment';

interface ErsReimbProps {
    reimbursments: Ers_reimbursment[];
}

describe('test for reimbursment list component',() => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should render', () => {
     //   const wrapper = mount( <ErsReimbComponent />);
      // expect(wrapper).toBeDefined();
    })
})