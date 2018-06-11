import { FETCH_TODOS } from '../actions/types';

const initialState = {
  todos: [],
  // todoData: {
  //   groupTodo: false,
  //   addTodoTask: '',
  //   assignee: '',
  //   assigner: this.props.userId,
  //   EventId: this.props.event.id,
  //   deadline: '',
  // },
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
}

export default todos;