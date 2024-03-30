import van from 'vanjs-core';

import type { Message, MessageResponse } from '../types';

const addState = van.state(0);

const changeFontSize = (add: number) => {
  addState.val += add;

  const elements = document.querySelectorAll<HTMLElement>('*');

  // フォントサイズを変更しながらだと、変更したフォントサイズを取得するため、変更と取得は分ける
  const list = [...elements].map((element) => {
    const style = getComputedStyle(element);
    const fontSize = style.fontSize;

    if (!fontSize) {
      return;
    }

    const fontSizeNumber = +fontSize.slice(0, -2);
    const newFontSize = `${fontSizeNumber + add}px`;

    return {
      element,
      newFontSize,
    };
  });

  list.forEach((item) => {
    if (!item) {
      return;
    }

    item.element.style.setProperty('font-size', item.newFontSize, 'important');
  });
};

// popupから受信
chrome.runtime.onMessage.addListener(
  (message: Message, _, sendResponse: (response: MessageResponse) => void) => {
    if (message.message === 'CHANGE_FONT_SIZE') {
      changeFontSize(message.add);
      return;
    }

    if (message.message === 'GET_ADD') {
      sendResponse({ add: addState.val });
      return;
    }
  },
);
