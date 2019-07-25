const personal = {
  trinket: {
    look: [
      {
        ssml: "<p>Just a bulge in thou pouchel at thist point.</p>",
        altText: "Just a bulge in thou pouchel at thist point.",
      },
    ],
    take: [
      {
        score: -1,
        ssml: "<p>Sigh, the trinket is in thou pouchel, recallest thou?</p>",
        altText: "Sigh. The trinket is in thou pouchel. Recallest thou?",
      },
    ],
    give: [
      {
        trigger: "dennis",
        endsGame: true,
        winsGame: true,
        ssml:
          '<p>A novel idea! You givst the trinket to Dennis, and he happily agrees to tell you what parapets are. With this new knowledge, ye escapes from yon dungeon in order to search for new dungeons, and to remain <audio src="soundbank://soundlibrary/nature/amzn_sfx_lightning_strike_01"/>Thy Dungeonman.</p>',
        altText:
          "A novel idea! You givst the trinket to Dennis and he happily agrees to tell you what parapets are. With this new knowledge, ye escapes from yon dungeon in order to search for new dungeons and to remain... Thy Dungeonman!",
      },
    ],
  },
};

export default personal;
