import { ActionTypes, ItemTypes, RoomTypes } from "shared/types/slots";
import { ActionDialog } from "shared/types/rooms";
import inventoryDialogs from "responses/inventories/personal";
import roomResponses from "responses/rooms";
import globalDialogs from "responses/inventories/global";

export default function determineActionDialog(
  item: ItemTypes,
  action: ActionTypes,
  inventory: ItemTypes[],
  curRoom: RoomTypes
): ActionDialog | undefined {
  let actionDialogs: ActionDialog[] = [];

  if (inventory.includes(item) && inventoryDialogs[item]) {
    actionDialogs = inventoryDialogs[item]![action] || [];
  } else if (roomResponses[curRoom].items[item]) {
    actionDialogs = roomResponses[curRoom].items[item]![action] || [];
  } else if (globalDialogs[item]) {
    actionDialogs = globalDialogs[item]![action] || [];
  }

  return actionDialogs.find(
    ({ trigger }) =>
      inventory.includes(trigger as ItemTypes) ||
      curRoom === trigger ||
      !trigger
  );
}
