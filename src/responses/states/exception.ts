import { DialogMap } from "../../shared/types/dialogs";

const exception: DialogMap = {
  help: {
    ssml: '<p>Say something like, "go south," or, "go north."</p>',
    altText: '<p>Say something like, "go south," or, "go north."</p>',
  },
  startOver: {
    ssml: "<p>We begin again the hero's adventure.</p>",
    altText: "We begin again the hero's adventure.",
  },
  repeat: {
    ssml: "<p>Ok, listen up this time bucko.</p>",
    altText: "Ok, listen up this time bucko.",
  },
  error: {
    ssml: "<p>That does not computeth. Say Help if thou needs of it.</p>",
    altText: "That does not computeth. Say Help if thou needs of it.",
  },
};

export default exception;
