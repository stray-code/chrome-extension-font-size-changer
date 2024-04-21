import { Message } from './types';

chrome.runtime.onMessage.addListener((message: Message) => {
  if (message.type === 'SET_BADGE_TEXT') {
    chrome.action.setBadgeText({ text: message.text });
  }
});
