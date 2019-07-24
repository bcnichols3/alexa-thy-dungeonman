import {
  ActionTypes,
  DirectionTypes,
  ItemTypes,
  RoomTypes,
} from "shared/types/slots";
import { Dialog } from "shared/types/dialogs";

export interface ActionDialog extends Dialog {
  trigger?: ItemTypes;
  score?: number;
  endsGame?: boolean;
  winsGame?: boolean;
}

export type ActionDialogMap = {
  [Key in ActionTypes]?: ActionDialog[];
};

export type Inventory = {
  [Key in ItemTypes]?: ActionDialogMap;
};

export type Room = {
  intro: Dialog;
  connections: {
    [Key in DirectionTypes]?: RoomTypes;
  };
  items: Inventory;
};
