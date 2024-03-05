export type usersType = Record<string, string>;

export type gameRoomsType = {
  [key: string]: Map<string, string>;
};

export type joinDataType = {
  room: string;
  displayName: string;
};
