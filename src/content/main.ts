import van from 'vanjs-core';

import type { Message, MessageResponse } from '../types';

const addState = van.state(0);

const getFontSize = (element: HTMLElement) => {
  // style属性のフォントサイズはマイナスに対応していないため、font-size属性から取得
  const fontSize = element.getAttribute('font-size');

  if (fontSize) {
    return fontSize;
  }

  const style = getComputedStyle(element);
  const styleFontSize = style.fontSize;

  return styleFontSize;
};

const changeFontSize = (add: number) => {
  addState.val += add;

  const elements = document.querySelectorAll<HTMLElement>('*');

  // フォントサイズを変更しながらだと、変更したフォントサイズを取得するため、変更と取得は分ける
  const list = [...elements].map((element) => {
    const fontSize = getFontSize(element);

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
    // style属性のフォントサイズはマイナスに対応していないため、font-size属性に保存
    item.element.setAttribute('font-size', item.newFontSize);
  });
};

// popupから受信
chrome.runtime.onMessage.addListener(
  (message: Message, _, sendResponse: (response: MessageResponse) => void) => {
    if (message.type === 'CHANGE_FONT_SIZE') {
      changeFontSize(message.add);
      return;
    }

    if (message.type === 'GET_ADD') {
      sendResponse({ add: addState.val });
      return;
    }
  },
);
