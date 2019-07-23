import { ItemTypes, RoomTypes } from "shared/types/slots";

export const States = ["WELCOME", "GOODBYE", "EXCEPTION", "PLAY"] as const;
export type StateTypes = typeof States[number];

export type Persist = {
  visits: number;
};

export interface SessionExclusive {
  state: StateTypes;
  curRoom: RoomTypes;
  score: number;
  inventory: ItemTypes[];
  previous: {
    reprompt: string;
    state: StateTypes;
  };
}

export interface Session extends SessionExclusive, Persist {}

export const initialPersist: Persist = {
  visits: 0,
};

export const initialSession: SessionExclusive = {
  state: "PLAY",
  curRoom: "dungeon",
  score: 0,
  inventory: [],
  previous: {
    reprompt: "",
    state: "PLAY",
  },
};
