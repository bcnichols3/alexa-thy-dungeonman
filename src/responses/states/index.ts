import { StateTypes } from "shared/types/attributes";
import { DialogMap } from "shared/types/dialogs";
import play from "responses/states/play";
import welcome from "responses/states/welcome";
import goodbye from "responses/states/goodbye";
import exception from "responses/states/exception";

const states: { [Key in StateTypes]: DialogMap } = {
  WELCOME: welcome,
  PLAY: play,
  GOODBYE: goodbye,
  EXCEPTION: exception,
};

export default states;
