import { createStore, combineReducers } from 'redux';
import branches, {
  NEW_MESSAGE,
  NEW_CONVERSATION,
  END_CONVERSATION,
  CONTINUE_CONVERSATION
} from './modules/branches';

const store = createStore(combineReducers({
  branches
}));

export default async function conversation({user, message, step, ...rest} = {}) {
  const {
    branches: {
      [user]: current
    }
  } = store.getState();

  store.dispatch({
    type: NEW_MESSAGE,
    user,
    message
  });

  if (!current && rest.conversation) {
    const current = rest.conversation;
    const next = current({
      ...rest,
      user,
      step
    });

    store.dispatch({
      type: NEW_CONVERSATION,
      user,
      next
    });
  } else if (current) {
    const next = current({
      ...rest,
      user,
      step
    });

    if (next) {
      store.dispatch({
        type: CONTINUE_CONVERSATION,
        user,
        next
      });
    } else {
      store.dispatch({
        type: END_CONVERSATION,
        user
      });
    }
  } else {
    console.error(`No conversation branch for user=${user}`);
  }
}
