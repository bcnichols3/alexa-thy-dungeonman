module.exports = {
  intro: {
    ssml:
      "<p>Ye find yeeself in yon dungeon. Ye see a scroll. Behind ye scroll is a flask. Obvious exits are north south and dennis.</p>",
    altText:
      "Ye find yeself in yon dungeon. Ye see a scroll. Behind ye scroll is a flask. Obvious exits are north south and dennis.",
  },
  connections: {
    north: "parapets",
    south: "embankment",
    dennis: "dennis",
  },
  items: {
    flask: {
      take: {
        ssml: "<p>You cannot get ye flask</p>",
        altText: "You cannot get ye flask.",
      },
      look: {
        ssml:
          "<p>Looks like you could quaff some serious mead out of that thing.</p>",
        altText:
          "Looks like you could quaff some serious mead out of that thing.",
      },
    },
    scroll: {
      take: {
        ssml:
          "<p>Ye doth suffer from memory loss. Ye scroll is no more. Honestly.</p>",
        altText:
          "Ye doth suffer from memory loss. Ye scroll is no more. Honestly.",
      },
      look: {
        ssml:
          "<p>Parchment, definitely parchment. I'd recognize it anywhere.</p>",
        altText: "Parchment, definitely parchment. I'd recognize it anywhere.",
      },
    },
  },
};
