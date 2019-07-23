import { DialogMap } from "shared/types/dialogs";

const goodbye: DialogMap = {
  playAgain: {
    ssml: "<p>Would you like to play again?</p>",
    altText: "Would you like to play again?",
  },
  restart: {
    ssml: "<p>Fine, let's playeth again.</p>",
    altText: "Fine, let's playeth again.",
  },
  final: {
    ssml: "<p>Fare the well.</p>",
    altText: "Fare the well.",
  },
};

export default goodbye;
