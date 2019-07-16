module.exports = {
  intro: {
    ssml:
      "<p>You head south to an enbankment. Or maybe a chasm. You can't decide which. Anyway, ye spies a trinket. Obvious exits are north.</p>",
    altText:
      "You head south to an enbankment. Or maybe a chasm. You can't decide which. Anyway, ye spies a trinket. Obvious exits are north.",
  },
  connections: {
    north: "dungeon",
  },
  items: {
    trinket: {
      look: {
        ssml: "<p>Quit looking! Just get it already.</p>",
        altText: "Quit looking! Just get it already.",
      },
      take: {
        ssml:
          "<p>Ye getsts yon trinket and discover it to be a bauble. You rejoice at your good fortune. You shove the trinket in your pouchel. It kinda hurts.</p>",
        altText:
          "Ye getsts yon trinket and discover it to be a bauble. You rejoice at your good fortune. You shove the trinket in your pouchel. It kinda hurts.",
      },
    },
  },
};
