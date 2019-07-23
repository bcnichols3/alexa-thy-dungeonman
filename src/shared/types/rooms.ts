import {
  ActionTypes,
  DirectionTypes,
  ItemTypes,
  RoomTypes,
  ThingTypes,
} from "shared/types/slots";
import { Dialog } from "shared/types/dialogs";

export interface ActionDialog extends Dialog {
  validTargets?: ThingTypes[];
  score?: number;
  endsGame?: boolean;
  winsGame?: boolean;
}

export type ActionDialogMap = {
  [Key in ActionTypes]?: ActionDialog;
};

export type Inventory = {
  [Key in ItemTypes]?: ActionDialogMap;
};

export type Room = {
  intro: {
    default: Dialog;
    look: Dialog;
    with: {
      [Key in ItemTypes]?: Dialog;
    };
  };
  connections: {
    [Key in DirectionTypes]?: RoomTypes;
  };
  items: Inventory;
};
