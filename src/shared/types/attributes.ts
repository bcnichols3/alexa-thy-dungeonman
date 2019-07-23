import { ItemTypes, RoomTypes } from "shared/types/slots";

export const States = ["WELCOME", "GOODBYE", "EXCEPTION", "PLAY"] as const;
export type StateTypes = typeof States[number];

export type Session = {
  state: StateTypes;
  curRoom: RoomTypes;
  score: number;
  inventory: ItemTypes[];
};

export const initialSesson: Session = {
  state: "WELCOME",
  curRoom: "dungeon",
  score: 0,
  inventory: [],
};

export type Persist = {
  visits: number;
};

export const initialPersist: Persist = {
  visits: 0,
};
