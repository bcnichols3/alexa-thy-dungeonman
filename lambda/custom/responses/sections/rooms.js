module.exports = {
  reprompt: [
    {
      ssml: "What wouldst thou do?",
      altText: "What wouldst thou deau?",
    },
    {
      ssml: "What dost thou do?",
      altText: "What dost thou deau?",
    },
    {
      ssml: "What ibn thine dine?",
      altText: "What ibn thine dine?",
    },
  ],
  dungeon: {
    intro: {
      speech: {
        ssml:
          "<p>Ye find yeself in yon dungeon. Ye see a scroll. Behind ye scroll is a flask. Obvious exits are north south and dennis.</p>",
        altText:
          "Ye find yeself in yon dungeon. Ye see a scroll. Behind ye scroll is a flask. Obvious exits are north south and dennis.",
      },
    },
    connections: {
      north: "parapets",
      south: "enbankment",
      dennis: "dennis",
    },
    items: {
      flask: {
        speech: {
          ssml: "<p>You cannot get ye flask</p>",
          altText: "You cannot get ye flask.",
        },
      },
    },
  },
  parapets: {
    intro: {
      speech: {
        ssml:
          "<p>You go north through yon corridor. You arrive at parapets. Ye see a rope. Obvious exits are south.</p>",
        altText:
          "You go north through yon corridor. You arrive at parapets. Ye see a rope. Obvious exits are south.",
      },
    },
    connections: {
      south: "dungeon",
    },
    items: {
      rope: {
        isLethal: true,
        speech: {
          ssml:
            "<p>You attempt to take ye rope but alas it is enchanted! It glows a mustard red and smells like a public privy. The rope wraps round your neck and hangs you from parapets. With your last breath, you wonder what parapets are.</p>",
          altText:
            "You attempt to take ye rope but, alas it is enchanted! It glows a mustard red and smells like a public privy. The rope wraps round your neck and hangs you from parapets. With your last breath, you wonder what parapets are.",
        },
      },
    },
  },
};
