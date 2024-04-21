chrome.runtime.onMessage.addListener((message) => {
  if (message.message === 'SET_BADGE_TEXT') {
    chrome.action.setBadgeText({ text: message.text });
  }
});
