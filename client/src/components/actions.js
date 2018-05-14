import axios from 'axios';

const FETCH_POSTS = 'FETCH_POSTS';
const NEW_POST = 'NEW_POST';

export function fetchPosts() {
  return function(dispatch) {
    // api call from comp did mount
    axios.get('/api/userEvents')
    .then(result => dispatch({
      type: FETCH_POSTS,
      payload: result
    }));
  };
}