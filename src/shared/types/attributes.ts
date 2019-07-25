import { ItemTypes, RoomTypes } from "shared/types/slots";

export const States = ["WELCOME", "GOODBYE", "EXCEPTION", "PLAY"] as const;
export type StateTypes = typeof States[number];

export interface Persist {
  visits: number;
  curRoom: RoomTypes;
  inventory: ItemTypes[];
  score: number;
}

export interface SessionExclusive {
  state: StateTypes;
  previous: {
    speech: string;
    reprompt: string;
    state: StateTypes;
  };
}

export interface Session extends SessionExclusive, Persist {}

export const newGame: Partial<Session> = {
  score: 0,
  inventory: [],
  curRoom: "dungeon",
};

export const newPersist: Persist = {
  visits: 0,
  curRoom: "dungeon",
  inventory: [],
  score: 0,
};

export const newSession: SessionExclusive = {
  state: "WELCOME",
  previous: {
    speech: "",
    reprompt: "",
    state: "WELCOME",
  },
};
