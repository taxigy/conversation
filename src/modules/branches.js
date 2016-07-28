import { handleActions } from 'redux-actions';

export const RECEIVE_MESSAGE = 'branches/NEW_MESSAGE';
export const KEEP_CONVERSATION = 'branches/KEEP_CONVERSATION';
export const END_CONVERSATION = 'branches/END_CONVERSATION';

const initialState = {};

export default handleActions({
  [RECEIVE_MESSAGE]: (state, {message = {}}) => {
    const {
      user
    } = message;

    if (!user) {
      console.error(`The state hasn't been changed because there's no such user=${user}.`);

      return state;
    } else {
      const {
        [user]: previous = {}
      } = state;
      const {
        messages = []
      } = previous;

      return {
        ...state,
        [user]: {
          ...previous,
          messages: [...messages, message]
        }
      };
    }
  },
  [KEEP_CONVERSATION]: (state, {message, branches}) => {
    const {
      user
    } = message;

    if (!user) {
      console.error(`The state hasn't been changed because there's no such user=${user}.`);

      return state;
    } else {
      const {
        [user]: previous = {}
      } = state;

      return {
        ...state,
        [user]: {
          ...previous,
          branches
        }
      };
    }
  },
  [END_CONVERSATION]: (state, {message}) => {
    const {
      user
    } = message;

    if (!user) {
      console.error(`The state hasn't been changed because there's no such user=${user}.`);

      return state;
    } else {
      const {
        [user]: previous = {}
      } = state;

      return {
        ...state,
        [user]: {
          ...previous,
          branches: null
        }
      };
    }
  }
}, initialState);
