type ChangeFontSizeMessage = {
  message: 'CHANGE_FONT_SIZE';
  add: number;
};

type GetADDMessage = {
  message: 'GET_ADD';
};

type SetBadgeText = {
  message: 'SET_BADGE_TEXT';
  text: string;
};

export type Message = ChangeFontSizeMessage | GetADDMessage | SetBadgeText;
