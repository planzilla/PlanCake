import axios from 'axios';
import { FETCH_POSTS, NEW_POST } from './types';

// const FETCH_POSTS = 'FETCH_POSTS';
// const NEW_POST = 'NEW_POST';

export function fetchPosts() {
  return function (dispatch) {  //eslint-disable-line
    axios.get('/api/userEvents')
      .then(result => dispatch({
        type: FETCH_POSTS,
        payload: result,
      }));
  };
}

export const createPost = postData => (dispatch) => {
  axios.post('/api/createEvent', postData)
    .then(result => dispatch({
      type: NEW_POST,
      payload: result,
    }));
};
