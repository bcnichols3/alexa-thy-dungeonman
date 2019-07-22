module.exports = {
  intro: {
    default: {
      ssml:
        "<audio src=\"soundbank://soundlibrary/doors/doors_metal/metal_04\"/><p>Ye find yeeself in yon dungeon. Ye see a scroll. Behind ye scroll is a flask. Obvious exits are north south and dennis.</p>",
      altText:
        "Ye find yeself in yon dungeon. Ye see a scroll. Behind ye scroll is a flask. Obvious exits are north south and dennis.",
    },
    with: {
      scroll: [
        {
          ssml:
            "<p>Ye find yeeself in yon dungeon. Ye see a flask. Obvious exits are north south and dennis. There is definitely no ye scroll, so drop it.</p>",
          altText:
            "Ye find yeeself in yon dungeon. Ye see a flask. Obvious exits are north south and dennis. There is definitely no ye scroll, so drop it.",
        },
      ],
    },
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
          "<audio src=\"soundbank://soundlibrary/doors/doors_glass/glass_02\"/><p>Ye cannot get the flask. It is firmly bolted to a wall which is bolted to the rest of the dungeon which is probably bolted to a castle. Never you mind.</p>",
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
          "<audio src=\"soundbank://soundlibrary/cloth_leather_paper/paper/paper_01\"/><p>Ye takes the scroll and reads of it. It doth say: beware, reader of the scroll, danger awaits to the <audio src=\"soundbank://soundlibrary/scifi/amzn_sfx_scifi_zap_electric_01\"/> The scroll disappears in thy hands with ye olde zap!</p>",
        altText:
          "Ye takes the scroll and reads of it. It doth say: beware, reader of the scroll, danger awaits to the… /zap noises/ The scroll disappears in thy hands with ye olde zap!",
      },
      look: {
        ssml:
          "<p>Parchment, definitely parchment. I'd recognize it anywhere.</p>",
        altText: "Parchment, definitely parchment. I'd recognize it anywhere.",
      },
    },
  },
};
