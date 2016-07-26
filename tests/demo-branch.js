import test from 'ava';
// import _ from 'lodash';
import conversation from '../src';

const branches = ({bot, user, message, outcomes}) => {
  const {
    intent,
    entities = {}
  } = outcomes;

  if (intent === 'AbsenceReport') {
    const {
      projected_time_period
    } = entities;

    if (projected_time_period) {
      bot.reply(message, `Get well soon, <@${user}>.`);

      return null;
    } else {
      bot.reply(message, `Do you know when you'll be back, <@${user}>?`);

      return ({bot, user, message, outcomes}) => {
        const {
          intent,
          entities: {
            projected_time_period
          } = {}
        } = outcomes;

        if (intent === 'TimeFrame' && projected_time_period) {
          bot.reply(message, `K TNX, <@${user}>.`);

          return null;
        } else {
          return null;
        }
      };
    }
  } else if (intent === 'AccidentReport') {
    // TODO
    // const {
    //   accident_kind,
    //   in_hospital,
    //   accident_place
    // } = entities;

    return null;
  } else if (intent === 'Greeting') {
    bot.reply(message, `Hello, <@${user}>!`);

    return null;
  } else {
    return null;
  }
};

test('Greeting', async test => {
  const bot = {
    reply: (message, text) => console.log(message, text)
  };
  const user = 'test';
  const message = {
    user: 'test',
    text: 'Hello, autotest!'
  };
  const outcomes = {
    intent: 'Greeting'
  };
  const c = await conversation({bot, user, message, outcomes, branches});
  console.log(c);

  if (c !== null) {
    test.fail();
  } else {
    test.pass();
  }
});
