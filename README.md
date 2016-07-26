# conversation
Conversation engine with Redux

## Usage

If you use Wit.ai and Howdy Botkit, you can do

```javascript
import conversation from 'conversation';

// make branches more meaningful
const branches = async (outcomes) => ({
  'Hello': async (outcomes) => ({})[outcomes.intent],
  'Goodbye': async (outcomes) => ({})[outcomes.intent]
})[outcomes.intent];

controller.on('direct_message', async (bot, message) => {
  try {
    const {
      user,
      text
    } = message;
    const outcomes = await wit.message(text, {});
    await conversation({
      user,
      message,
      branches, // will be used if there's no current conversation
      outcomes // will be passed to a function returned by branch, branch(...), branch(...)(...), etc
    });
  } catch (error) {
    console.error(error);
  }
});
```

The idea is

1. Bot's reply is a side-effect, therefore you can listen to user's messages until a reply, or reply with multiple messages per a single user's intent.
1. In `branches`, every branch is a function, including the starting branch, and this function returns a function that will be called with the next user's message.

## Todo

- [ ] distinguish between "conversation has ended" and "a user tabled a conversation" (jumped to another topic),
- [ ] distinguish between "expect until full set of information has been retrieved from the user" and "just don't reply to this intent and plan to reply to the next one".
