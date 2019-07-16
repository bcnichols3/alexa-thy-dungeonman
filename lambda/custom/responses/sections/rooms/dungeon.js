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
        score: 2,
        ssml:
          "<p>Ye cannot get the flask. It is firmly bolted to a wall which is bolted to the rest of the dungeon which is probably bolted to a castle. Never you mind.</p>",
        altText:
          "Ye cannot get the flask. It is firmly bolted to a wall which is bolted to the rest of the dungeon which is probably bolted to a castle. Never you mind.",
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
        score: 2,
        ssml:
          "<p>Ye takes the scroll and reads of it. It doth say: beware, reader of the scroll, danger awaits to the. The scroll disappears in thy hands with ye olde zap!</p>",
        altText:
          "Ye takes the scroll and reads of it. It doth say: beware, reader of the scroll, danger awaits to the. The scroll disappears in thy hands with ye olde zap!",
      },
      look: {
        ssml:
          "<p>Parchment, definitely parchment. I'd recognize it anywhere.</p>",
        altText: "Parchment, definitely parchment. I'd recognize it anywhere.",
      },
    },
  },
};
