type ChangeFontSizeMessage = {
  type: 'CHANGE_FONT_SIZE';
  add: number;
};

type GetADDMessage = {
  type: 'GET_ADD';
};

export type Message = ChangeFontSizeMessage | GetADDMessage;
