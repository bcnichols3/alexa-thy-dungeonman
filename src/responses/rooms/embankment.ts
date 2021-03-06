const embankment = {
  intro: {
    ssml:
      '<audio src="soundbank://soundlibrary/footsteps/sand_gravel_mud/sand_gravel_09"/><p>You head south to an enbankment. Or maybe a chasm.</p><audio src="soundbank://soundlibrary/nature/amzn_sfx_wind_whistling_desert_01"/><p>You can\'t decide which. Anyway, ye spies a trinket. Obvious exits are north.</p>',
    altText:
      "You head south to an enbankment. Or maybe a chasm. You can't decide which. Anyway, ye spies a trinket. Obvious exits are north.",
  },
  connections: {
    north: "dungeon",
  },
  items: {
    embankment: {
      look: [
        {
          trigger: "trinket",
          ssml:
            "<p>Thou hangeth out at an overlook. Obvious exits are north. I shouldn't have to tell ye there is no trinket.</p>",
          altText:
            "Thou hangeth out at an overlook. Obvious exits are north. I shouldn't have to tell ye there is no trinket.",
        },
        {
          ssml:
            "<p>Ye stand yeself close to a yet-unnamed escarpment. Nonetheless, ye spies a trinket. Obvious exits are north.</p>",
          altText:
            "Ye stand yeself close to a yet-unnamed escarpment. Nonetheless, ye spies a trinket. Obvious exits are north.",
        },
      ],
    },
    trinket: {
      look: [
        {
          ssml: "<p>Quit looking! Just get it already.</p>",
          altText: "Quit looking! Just get it already.",
        },
      ],
      take: [
        {
          score: 2,
          ssml:
            '<audio src="soundbank://soundlibrary/magic_spells/magic_spells_14"/><p>Ye getsts yon trinket and discover it to be a bauble. You rejoice at your good fortune. You shove the trinket in your pouchel. It kinda hurts.</p>',
          altText:
            "Ye getsts yon trinket and discover it to be a bauble. You rejoice at your good fortune. You shove the trinket in your pouchel. It kinda hurts.",
        },
      ],
    },
  },
};

export default embankment;
