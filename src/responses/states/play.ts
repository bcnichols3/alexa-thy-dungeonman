import { ActionDialog } from "shared/types/rooms";

const play: { [Key: string]: ActionDialog } = {
  reprompt: {
    ssml: "What wouldst thou do?",
    altText: "What wouldst thou deau?",
  },
  die: {
    score: -100,
    ssml: "<p>That wasn't very smart.</p>",
    altText: "That wasn't very smart.",
  },
  dance: {
    ssml: "<p>Thou shaketh a little and it feeleth alright.</p>",
    altText: "Thou shaketh a little and it feeleth alright.",
  },
  smell: {
    ssml: "<p>You smell a Wumpus.</p>",
    altText: "You smell a Wumpus.",
  },
  win: {
    ssml: "<p>You hath won! Congratulation!</p>",
    altText: "You hath won! Congratulation!",
  },
};

export default play;
