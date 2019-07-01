module.exports = {
  firstTime: {
    speech: [
      {
        ssml:
          '<p>Welcome to Train Chomp. Here you\'ll find status updates on subway lines in New York City, from the <say-as interpret-as="digits">123</say-as> to the Staten Island Railroad, all delivered from the official M.T.A. info wire.</p>',
        altText:
          "Welcome to Train Chomp. Here you'll find status updates on subway lines in New York City, from the 123 to the Staten Island Railroad.",
      },
    ],
  },
  returning: {
    speech: [
      {
        ssml: "<p>Welcome back to Train Chomp.</p>",
        altText: "Welcome back to Train Chomp.",
      },
    ],
    reprompt: [
      {
        ssml: "<p>What subway line?</p>",
        altText: "What subway line?",
      },
    ],
  },
};
