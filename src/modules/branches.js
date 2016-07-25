import { handleActions } from 'redux-actions';

export const NEW_CONVERSATION = 'branches/NEW_CONVERSATION';
export const END_CONVERSATION = 'branches/END_CONVERSATION';
export const CONTINUE_CONVERSATION = 'branches/CONTINUE_CONVERSATION';

export const initConversation = ({user, conversation}) => ({
  type: initConversation,
  user,
  conversation
});

const initialState = {};

export default handleActions({
  [NEW_CONVERSATION]: (state, {user, next}) => ({
    ...state,
    [user]: next
  }),
  [END_CONVERSATION]: (state, {user}) => ({
    ...state,
    [user]: null
  }),
  [CONTINUE_CONVERSATION]: (state, {user, next}) => ({
    ...state,
    [user]: next
  })
}, initialState);
