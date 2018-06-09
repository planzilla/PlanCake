import axios from 'axios';
import { FETCH_TODOS } from './types';

export const fetchTodos = () => dispatch => {
  axios.get('/api/todos')
    .then(result => dispatch({
        type: FETCH_TODOS,
        payload: result.data,
      })
    );
}
