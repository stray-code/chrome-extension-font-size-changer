type ChangeFontSizeMessage = {
  message: 'CHANGE_FONT_SIZE';
  add: number;
};

type GetADDMessage = {
  message: 'GET_ADD';
};

export type Message = ChangeFontSizeMessage | GetADDMessage;
