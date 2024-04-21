chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'SET_BADGE_TEXT') {
    chrome.action.setBadgeText({ text: message.text });
  }
});
