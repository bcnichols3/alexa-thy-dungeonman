module.exports = {
  trinket: {
    look: {
      ssml: "<p>Just a bulge in thou pouchel at thist point.</p>",
      altText: "Just a bulge in thou pouchel at thist point.",
    },
    take: {
      score: -1,
      ssml: "<p>Sigh, the trinket is in thou pouchel, recallest thou?</p>",
      altText: "Sigh. The trinket is in thou pouchel. Recallest thou?",
    },
    give: {
      validTargets: ["dennis"],
      endsGame: true,
      winsGame: true,
      ssml:
        "<p>A novel idea! You givst the trinket to Dennis, and he happily agrees to tell you what parapets are. With this new knowledge ye escapes from yon dungeon, in order to search for new dungeons, and to remain... Thy Dungeonman.</p>",
      altText:
        "A novel idea! You givst the trinket to Dennis and he happily agrees to tell you what parapets are. With this new knowledge, ye escapes from yon dungeon in order to search for new dungeons and to remain... Thy Dungeonman!",
    },
  },
  flask: {
    take: {
      endsGame: true,
      score: -1000,
      ssml:
        "<p>Okay, okay. You unbolt yon flask and hold it aloft.</p><audio src=\"soundbank://soundlibrary/nature/amzn_sfx_earthquake_rumble_01\"/><p>A great shaking begins. The dungeon ceiling collapses down on you, crushing you in twain. Apparently, this was a load-bearing flask.</p>",
      altText:
        "Okay, okay. You unbolt yon FLASK and hold it aloft. A great shaking begins. The dungeon ceiling collapses down on you, crushing you in twain. Apparently, this was a load-bearing FLASK.",
    },
  },
  scroll: {
    score: -1,
    take: {
      ssml:
        "<p>Ye doth suffer from memory loss. Ye scroll is no more. Honestly.</p>",
      altText:
        "Ye doth suffer from memory loss. Ye scroll is no more. Honestly.",
    },
    look: {
      ssml: "<p>Ye seeth nothing wheretofore it went zap.</p>",
      altText: "Ye seeth nothing wheretofore it went zap.",
    },
  },
};
