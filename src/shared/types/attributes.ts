import { ItemTypes, RoomTypes } from "shared/types/slots";

export const States = ["WELCOME", "GOODBYE", "EXCEPTION", "PLAY"] as const;
export type StateTypes = typeof States[number];

export type Persist = {
  visits: number;
  curRoom: RoomTypes;
  inventory: ItemTypes[];
};

export interface SessionExclusive {
  state: StateTypes;
  score: number;
  previous: {
    speech: string;
    reprompt: string;
    state: StateTypes;
  };
}

export interface Session extends SessionExclusive, Persist {}

export const initialPersist: Persist = {
  visits: 0,
  curRoom: "dungeon",
  inventory: [],
};

export const initialSession: SessionExclusive = {
  state: "WELCOME",
  score: 0,
  previous: {
    speech: "",
    reprompt: "",
    state: "WELCOME",
  },
};
