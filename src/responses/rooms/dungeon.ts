const dungeon = {
  intro: {
    ssml:
      '<audio src="soundbank://soundlibrary/doors/doors_locker_doors/locker_doors_03"/><p>Ye find yeeself in yon dungeon. Ye see a scroll. Behind ye scroll is a flask. Obvious exits are north south and dennis.</p>',
    altText:
      "Ye find yeself in yon dungeon. Ye see a scroll. Behind ye scroll is a flask. Obvious exits are north south and dennis.",
  },
  connections: {
    north: "parapets",
    south: "embankment",
    dennis: "dennis",
  },
  items: {
    dungeon: {
      look: [
        {
          trigger: "scroll",
          ssml:
            "<p>Ye are in yon dungeon. Ye scroll is no more, leaving naught but ye flask. Obvious exits are north south and dennis.</p>",
          altText:
            "Ye are in yon dungeon. Ye scroll is no more, leaving naught but ye flask. Obvious exits are north south and dennis.",
        },
        {
          ssml:
            "<p>Ye are in yon dungeon. Ye scroll is near, as is ye flask. Obvious exits are north south and dennis.</p>",
          altText:
            "Ye are in yon dungeon. Ye scroll is near, as is ye flask. Obvious exits are north south and dennis.",
        },
      ],
    },
    flask: {
      take: [
        {
          trigger: "flask",
          endsGame: true,
          score: -1000,
          ssml:
            '<p>Okay, okay. You unbolt yon flask and hold it aloft.</p><audio src="soundbank://soundlibrary/nature/amzn_sfx_earthquake_rumble_01"/><p>A great shaking begins. The dungeon ceiling collapses down on you, crushing you in twain. Apparently, this was a load-bearing flask.</p>',
          altText:
            "Okay, okay. You unbolt yon FLASK and hold it aloft. A great shaking begins. The dungeon ceiling collapses down on you, crushing you in twain. Apparently, this was a load-bearing FLASK.",
        },
        {
          score: 2,
          ssml:
            '<audio src="soundbank://soundlibrary/doors/doors_glass/glass_02"/><p>Ye cannot get the flask. It is firmly bolted to a wall which is bolted to the rest of the dungeon which is probably bolted to a castle. Never you mind.</p>',
          altText:
            "Ye cannot get the flask. It is firmly bolted to a wall which is bolted to the rest of the dungeon which is probably bolted to a castle. Never you mind.",
        },
      ],
      look: [
        {
          ssml:
            "<p>Looks like you could quaff some serious mead out of that thing.</p>",
          altText:
            "Looks like you could quaff some serious mead out of that thing.",
        },
      ],
    },
    scroll: {
      take: [
        {
          trigger: "scroll",
          score: -1,
          ssml:
            "<p>Ye doth suffer from memory loss. Ye scroll is no more. Honestly.</p>",
          altText:
            "Ye doth suffer from memory loss. Ye scroll is no more. Honestly.",
        },
        {
          score: 2,
          ssml:
            '<audio src="soundbank://soundlibrary/cloth_leather_paper/paper/paper_01"/><p>Ye takes the scroll and reads of it. It doth say: beware, reader of the scroll, danger awaits to the <audio src="soundbank://soundlibrary/scifi/amzn_sfx_scifi_zap_electric_01"/> The scroll disappears in thy hands with ye olde zap!</p>',
          altText:
            "Ye takes the scroll and reads of it. It doth say: beware, reader of the scroll, danger awaits to the… /zap noises/ The scroll disappears in thy hands with ye olde zap!",
        },
      ],
      look: [
        {
          trigger: "scroll",
          ssml: "<p>Ye seeth nothing wheretofore it went zap.</p>",
          altText: "Ye seeth nothing wheretofore it went zap.",
        },
        {
          ssml:
            "<p>Parchment, definitely parchment. I'd recognize it anywhere.</p>",
          altText:
            "Parchment, definitely parchment. I'd recognize it anywhere.",
        },
      ],
    },
  },
};

export default dungeon;
