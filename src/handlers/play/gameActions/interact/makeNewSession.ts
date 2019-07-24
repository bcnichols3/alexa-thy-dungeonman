import { Session } from "shared/types/attributes";
import { ActionTypes, ItemTypes } from "shared/types/slots";

export default function makeNewSession(
  { inventory, score }: Session,
  item: ItemTypes,
  action: ActionTypes,
  bonus: number = 0
) {
  const newSession = {
    score: score + bonus,
    inventory: inventory.slice(),
  };

  if (action === "take" && !inventory.includes(item)) {
    newSession.inventory.push(item);
  }

  return newSession;
}
