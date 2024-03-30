import van from 'vanjs-core';

import type { Message, MessageResponse } from '../types';

export const useAddState = () => {
  const addState = van.state(0);

  // popupを開くとstateが初期化されるため、content_scriptsからstateを取得する
  (async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab.id) {
      return;
    }

    // content_scriptsへ送信
    chrome.tabs.sendMessage<Message, MessageResponse>(
      tab.id,
      { message: 'GET_ADD' },
      (response) => {
        addState.val = response.add;
      },
    );
  })();

  return {
    addState,
  };
};
