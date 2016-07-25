import { handleActions } from 'redux-actions';

export const NEW_MESSAGE = 'branches/NEW_MESSAGE';
export const NEW_CONVERSATION = 'branches/NEW_CONVERSATION';
export const END_CONVERSATION = 'branches/END_CONVERSATION';
export const CONTINUE_CONVERSATION = 'branches/CONTINUE_CONVERSATION';

const initialState = {};

export default handleActions({
  [NEW_MESSAGE]: (state, {user, message}) => ({
    ...state,
    [user]: {
      ...(state[user] || {}),
      messages: [message, ...(state[user] ? state[user].messages : [])]
    }
  }),
  [NEW_CONVERSATION]: (state, {user, next}) => ({
    ...state,
    [user]: {
      ...(state[user] || {}),
      next
    }
  }),
  [END_CONVERSATION]: (state, {user}) => ({
    ...state,
    [user]: {
      ...(state[user] || {}),
      next: null
    }
  }),
  [CONTINUE_CONVERSATION]: (state, {user, next}) => ({
    ...state,
    [user]: {
      ...(state[user] || {}),
      next
    }
  })
}, initialState);
