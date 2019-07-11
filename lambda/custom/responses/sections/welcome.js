module.exports = {
  firstTime: {
    speech: [
      {
        ssml:
          'Welcome to Thy Dungeonman. You are thy dungeonman. Ye find yeself in yon dungeon. Ye see a scroll. Behind ye scroll is a flask. Obvious exits are north south and dennis.',
        altText:
          "Welcome to Thy Dungeonman. You are thy dungeonman. Ye find yeself in yon dungeon. Ye see a scroll. Behind ye scroll is a flask. Obvious exits are north south and dennis.",
      },
    ],
  },
  returning: {
    speech: [
      {
        ssml: "<p>Welcome back to Train Chomp.</p>",
        altText: "Welcome back to Train Chomp.",
      },
    ],
    reprompt: [
      {
        ssml: "<p>What subway line?</p>",
        altText: "What subway line?",
      },
    ],
  },
};
