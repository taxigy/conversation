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
  }

  const {
    branches: {
      [message.user]: current
    }
  } = store.getState();

  store.dispatch({
    type: RECEIVE_MESSAGE,
    message
  });

  if (!current && branches) {
    const current = branches;
    const next = await current({
      bot,
      message,
      ...rest
    });

    store.dispatch({
      type: KEEP_CONVERSATION,
      message,
      branches: next
    });

    return next;
  } else if (current) {
    const next = await current({
      bot,
      message,
      ...rest
    });

    if (next) {
      store.dispatch({
        type: KEEP_CONVERSATION,
        message,
        branches: next
      });
    } else {
      store.dispatch({
        type: END_CONVERSATION,
        message
      });
    }

    return next;
  } else {
    return null;
  }
}
