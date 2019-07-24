const welcome = {
  firstTime: {
    ssml:
      '<audio src="https://shining-advance.s3.amazonaws.com/audio/intro.mp3"/><p>Welcome to Thy Dungeonman. You are thy dungeonman.</p>',
    altText: "Welcome to Thy Dungeonman. You are thy dungeonman.",
  },
  returning: {
    ssml:
      '<audio src="https://shining-advance.s3.amazonaws.com/audio/intro.mp3"/><p>Welcome back to Thy Dungeonman.</p>',
    altText: "Welcome back to Thy Dungeonman",
  },
  interrupted: {
    ssml:
      "<p>Thy dungeon was left half-complete, man. Wouldst thou like to finish playing?</p>",
    altText:
      "Thy dungeon was left half-complete, man. Wouldst thou like to finish playing?",
  },
  resume: {
    ssml: "<p>Thy dungeon awaits.</p>",
    altText: "Thy dungeon awaits.",
  },
};

export default welcome;
