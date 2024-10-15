# react-chat-components

A set of highly-themeable React components for chat apps, inspired by the interfaces of WhatsApp, iMessage, Facebook Messenger, Skype, etc.

## Installation

`npm i react-chat-components`

## Docs and References

### Storybook

The Storybook docs are still a work in progress, but provide examples of all components:
https://kfirprods.github.io/react-chat-components

### Example app - "Zkype"

Check out the `example-app` folder which implements "Zkype", a minimal NextJS mock-up of Skype's chat interface. It uses `react-chat-components` and demonstrates how the components can be themed by overriding CSS variables and some CSS classes.

## Roadmaps

### v1.0 ROADMAP

#### CHAT

- [x] When rendering messages, support a slot to render custom content above and below the built-in bubble

#### CHAT INPUT

- [ ] Multiline
- [ ] Slots inside the input area (commonly used for stickers/emojis)
- [ ] Highlight URLs

#### CHAT BUBBLES

- [ ] Support rendering profile photos

#### SENDING ATTACHMENTS

- [ ] Render a preview before sending attachment(s)
- [ ] Support sending multiple attachments in a single message

#### RECEIVING ATTACHMENTS

- [ ] Render unsupported attachments in a generic fashion that'll allow them to be downloaded

### v2.0 ROADMAP

#### CHAT BUBBLES

- [ ] Replies/quotes
- [ ] Menus (e.g. reply, copy, forward)
