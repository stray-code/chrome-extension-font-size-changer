import van from 'vanjs-core';

import type { Message } from '../types';

import { useAddState } from './useAddState';

import './style.css';

const App = () => {
  const { div, button, p, img } = van.tags;

  const { addState } = useAddState();

  const onClick = async (add: number) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab.id) {
      return;
    }

    addState.val += add;

    // content_scriptsへ送信
    chrome.tabs.sendMessage<Message>(tab.id, {
      type: 'CHANGE_FONT_SIZE',
      add,
    });

    chrome.runtime.sendMessage<Message>({
      type: 'SET_BADGE_TEXT',
      text: `${addState.val === 0 ? '' : addState.val}`,
    });
  };

  return div(
    {
      class: 'p-2 w-[200px]',
    },
    div(
      { class: 'flex items-center' },
      p({ class: 'text-md' }, () => (addState.val > 0 ? '+' : ''), addState),
      div(
        { class: 'ml-auto flex items-center gap-2' },
        button(
          {
            class: 'p-1 rounded-full hover:bg-gray-200 transition-colors',
            onclick: () => onClick(-2),
          },
          img({ src: '/img/minus.svg', class: 'size-[16px]' }),
        ),
        button(
          {
            class: 'p-1 rounded-full hover:bg-gray-200 transition-colors',
            onclick: () => onClick(2),
          },
          img({ src: '/img/plus.svg', class: 'size-[16px]' }),
        ),
        button(
          {
            class:
              'p-1 px-2 rounded-full border border-blue-600 hover:bg-gray-200 text-blue-600 transition-colors',
            onclick: () => onClick(addState.val * -1),
          },
          'リセット',
        ),
      ),
    ),
  );
};

van.add(document.getElementById('app')!, App());
