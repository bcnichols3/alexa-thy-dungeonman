// export const AdvancedFilterGroups = ["location", "payGroup"] as const;
// export type AdvancedFilterGroupTypes = typeof AdvancedFilterGroups[number];

export const Actions = [
  "go",
  "take",
  "look",
  "talk",
  "give",
  "dance",
  "die",
  "smell",
] as const;
export type ActionTypes = typeof Actions[number];

export const Directions = [
  "north",
  "south",
  "east",
  "west",
  "dennis",
  "notDennis",
] as const;
export type DirectionTypes = typeof Directions[number];

export const Rooms = ["dennis", "dungeon", "embankment", "parapets"] as const;
export type RoomTypes = typeof Rooms[number];

export const Items = [
  ...Rooms,
  "flask",
  "scroll",
  "trinket",
  "jimberjam",
  "rope",
  "dagger",
] as const;
export type ItemTypes = typeof Items[number];

export const Things = [...Items, ...Directions] as const;
export type ThingTypes = typeof Things[number];
