module.exports = {
  intro: {
    ssml:
      "<p>You go north through yon corridor. You arrive at parapets. Ye see a rope. Obvious exits are south.</p>",
    altText:
      "You go north through yon corridor. You arrive at parapets. Ye see a rope. Obvious exits are south.",
  },
  connections: {
    south: "dungeon",
  },
  items: {
    parapets: {
      look: {
        ssml: "<p>Well, they're parapets. This much we know for sure.</p>",
        altText: "Well, they're parapets. This much we know for sure.",
      },
    },
    rope: {
      isLethal: true,
      look: {
        ssml: "<p>It looks okay. You've seen better.</p>",
        altText: "It looks okay. You've seen better.",
      },
      take: {
        ssml:
          "<p>You attempt to take ye rope but alas it is enchanted! It glows a mustard red and smells like a public privy. The rope wraps round your neck and hangs you from parapets. With your last breath, you wonder what parapets are.</p>",
        altText:
          "You attempt to take ye rope but, alas it is enchanted! It glows a mustard red and smells like a public privy. The rope wraps round your neck and hangs you from parapets. With your last breath, you wonder what parapets are.",
      },
    },
  },
};
