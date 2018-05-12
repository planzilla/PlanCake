import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateEvent from '../../client/src/components/body/CreateEvent.jsx';


Enzyme.configure({ adapter: new Adapter() });

test('renders without exploding', () => {
  expect(
    shallow(
      <CreateEvent
      handleCreateEvent={() => {}}
      handleInputChange={() => {}}
      handleModalOpenClose={() => {}}
      createEventError={null}
      createEventModalOpen={null}
    />
    ).length
  ).toBe(1);
})
