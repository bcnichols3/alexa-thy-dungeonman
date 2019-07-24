import { ActionTypes } from "shared/types/slots";
import { CustomHandler, Handler, PropsMaker } from "shared/types/handlers";
import go, { determineHeading } from "handlers/play/gameActions/go";
import interact, {
  makeInteractProps,
} from "handlers/play/gameActions/interact";
import smell from "handlers/play/gameActions/smell";
import dance from "handlers/play/gameActions/dance";
import die from "handlers/play/gameActions/die";

type ActionsHandlersMap = {
  [key in ActionTypes]: {
    makeProps: PropsMaker;
    handler: Handler | CustomHandler<any>;
  };
};

const emptyMakeProps: PropsMaker = () => {};

const gameActions: ActionsHandlersMap = {
  go: {
    makeProps: determineHeading,
    handler: go,
  },
  die: {
    makeProps: emptyMakeProps,
    handler: die,
  },
  dance: {
    makeProps: emptyMakeProps,
    handler: dance,
  },
  smell: {
    makeProps: emptyMakeProps,
    handler: smell,
  },
  look: {
    makeProps: makeInteractProps,
    handler: interact,
  },
  take: {
    makeProps: makeInteractProps,
    handler: interact,
  },
  talk: {
    makeProps: makeInteractProps,
    handler: interact,
  },
  give: {
    makeProps: makeInteractProps,
    handler: interact,
  },
};

export { dance, die, go, interact, smell };
export default gameActions;
