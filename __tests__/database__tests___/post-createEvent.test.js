/*
import { get, post, patch } from '../../server/controller.js';
import { Event } from '../../database/models';

const clearDatabase = () => {
  User.destroy({
    where: {},
    truncate: true
  })
}

test('Should add event to Event model', () => {
  const titleTest = 'Testing title';
  const locationTest = 'Seattle, WA';
  
  post.createEvent({
    body: {
      createEventTitle: titleTest,
      createEventLocation: locationTest
    }
  })
  .then(() => Event.findOne({
    where: {titleTest}
  }))
  .then((event) => expect(event.location).toBe('Seattle, WA'))
})

afterAll(clearDatabase);
*/