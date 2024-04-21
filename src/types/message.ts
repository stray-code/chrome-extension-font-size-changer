type ChangeFontSizeMessage = {
  type: 'CHANGE_FONT_SIZE';
  add: number;
};

type GetADDMessage = {
  type: 'GET_ADD';
};

type SetBadgeText = {
  type: 'SET_BADGE_TEXT';
  text: string;
};

export type Message = ChangeFontSizeMessage | GetADDMessage | SetBadgeText;
