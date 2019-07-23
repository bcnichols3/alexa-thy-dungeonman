import { DialogMap } from "shared/types/dialogs";

const invalid: DialogMap = {
  go: {
    ssml:
      "<p>Thou cannotst go there. Who do you think thou art? A magistrate?!</p>",
    altText:
      "Thou cannotst go there. Who do you think thou art? A magistrate?!",
  },
  take: {
    ssml: "<p>Thou cannotst get that. Quit making stuffeth up!</p>",
    altText: "Thou cannotst get that. Quit making stuffeth up!",
  },
  look: {
    ssml: "<p>It looketh pretty awesome.</p>",
    altText: "It looketh pretty awesome.",
  },
  give: {
    ssml: "<p>Thou don'tst have that to give. Go back to your tiny life.</p>",
    altText: "Thou don'tst have that to give. Go back to your tiny life.",
  },
};

export default invalid;
