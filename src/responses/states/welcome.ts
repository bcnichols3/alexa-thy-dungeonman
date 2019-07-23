import { DialogMap } from "shared/types/dialogs";

const welcome: DialogMap = {
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
};

export default welcome;
