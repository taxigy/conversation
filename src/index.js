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

export default async function conversation({bot, user, message, ...rest} = {}) {
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

  if (!current && rest.branches) {
    const current = rest.branches;
    const next = await current({
      ...rest,
      bot,
      user
    });

    store.dispatch({
      type: NEW_CONVERSATION,
      user,
      next
    });
  } else if (current) {
    const next = await current({
      ...rest,
      bot,
      user
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
