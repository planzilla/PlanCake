import { FETCH_POSTS, NEW_POST } from '../actions/types';

const initialState = {
  events: [],
  event: {
    id: '',
    title: '',
    location: '',
    createdAt: '',
    updatedAt: '',
  },
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        events: action.payload,
      };
    case NEW_POST:
      return {
        ...state,
        event: action.payload,
      };
    default:
      return state;
  }
};

export default events;
