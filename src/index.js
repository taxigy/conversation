import { createStore, combineReducers } from 'redux';
import branches, {
  RECEIVE_MESSAGE,
  KEEP_CONVERSATION,
  END_CONVERSATION
} from './modules/branches';

const store = createStore(combineReducers({
  branches
}));

export default async function conversation({bot, message, branches, ...rest} = {}) {
  if (!bot || !message || !branches) {
    throw new Error('I want your bot, your message and your branches.');
  } else {
    const {
      branches: {
        [message.user]: current
      }
    } = store.getState();
    const next = await (current || branches)({
      bot,
      message,
      ...rest
    });

    store.dispatch({
      type: RECEIVE_MESSAGE,
      message
    });

    if (next instanceof Function) {
      store.dispatch({
        type: KEEP_CONVERSATION,
        message,
        branches: next
      });
    } else {
      store.dispatch({
        type: END_CONVERSATION,
        message,
        branches: next
      });
    }
  }
}
