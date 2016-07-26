# conversation
Conversation engine with Redux

## Usage

If you use Wit.ai and Howdy Botkit, you can do

```javascript
import conversation from './src';
import branches from './branches'; // compose branches somewhere

controller.on('direct_message', async (bot, message) => {
  try {
    const outcomes = await wit.message(message.text, {});
    await conversation({
      user,
      message,
      branches, // will be used if there's no current conversation
      outcomes // will be passed to a function returned by branch, branch(...), branch(...)(...), etc
    });
  } catch (error) {
    bot.reply(message, error.message);
  }
});
```

The idea is

1. Bot's reply is either a returned partially applied function, or a side-effect.
1. You can listen to user's messages until a reply, or reply with multiple messages per a single user's intent. Based on what you need, compose your branches.
1. Branches is a function that returns function that returns function, etc. If a function is returned, the conversation continues. If `null` is return, current conversation is considered to be finished, and a new one will be launched the next time a user sends a message.
1. Each `conversation(...arguments)` call returns current step in branches but it's not necessary to use it explicitly. Anyway, it's up to you to either to rely on side-effects or returned value, since custom branches define that, not the engine itself.

## Todo

- [ ] distinguish between "conversation has ended" and "a user tabled a conversation" (jumped to another topic),
- [ ] distinguish between "expect until full set of information has been retrieved from the user" and "just don't reply to this intent and plan to reply to the next one".
