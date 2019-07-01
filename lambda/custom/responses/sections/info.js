module.exports = {
  arrivals: {
    template:
      "<p>The next ${route} trains will arrive at ${station} in approximately: ${arrivalTimes}.</p>",
  },
  statuses: {
    goodService: [
      {
        ssml: "<p>The ${subwayLine} is reporting good service.</p>",
      },
      {
        ssml: "<p>All clear on the ${subwayLine}.</p>",
      },
      {
        ssml: "<p>Good service on the ${subwayLine}.</p>",
      },
    ],
    plannedWork: [
      {
        ssml: "<p>Planned work on the ${subwayLine}.</p>",
      },
      {
        ssml: "<p>The ${subwayLine} has planned work scheduled.</p>",
      },
    ],
    delays: [
      {
        ssml: "<p>The ${subwayLine} is currently reporting delays.</p>",
      },
      {
        ssml: "<p>Delays on the ${subwayLine}.</p>",
      },
    ],
    serviceChange: [
      {
        ssml: "<p>A service change was made on the ${subwayLine}.</p>",
      },
      {
        ssml: "<p>The ${subwayLine} has had a change in service.</p>",
      },
    ],
  },
  retorts: {
    goodService: [
      {
        ssml: "<p>Go get 'em.</p>",
      },
      {
        ssml: "<p>Safe travels.</p>",
      },
      {
        ssml: "<p>Carpe the heck out of that diem.</p>",
      },
      {
        ssml: "<p>Have a great day.</p>",
      },
      {
        ssml:
          "<p>Have a great day and remember, if you see something, say something.</p>",
      },
    ],
    delays: [
      {
        ssml:
          "<p>Maybe because someone was holding the car doors while the train was in the station.</p>",
      },
      {
        ssml: "<p>What time is it? Delays time.</p>",
      },
      {
        ssml: "<p>It's like deja vu all over again.</p>",
      },
    ],
    badService: [
      {
        ssml:
          "<p>Now you'll have extra time to contemplate where Upstate New York begins.</p>",
      },
      {
        ssml: "<p>Better give yourself some extra travel time.</p>",
      },
      {
        ssml:
          "<p>Sounds like the New York Minute just got a little longer.</p>",
      },
      {
        ssml: "<p>What ya gonna do.</p>",
      },
      {
        ssml:
          "<p>Better make sure your favorite podcast is pre-downloaded.</p>",
      },
      {
        ssml: "<p>I hope your phone has a full battery.</p>",
      },
    ],
  },
  declineFavorite: {
    ssml: "<p>Okay.</p>",
  },
  setFavorite: {
    ssml: "<p>Would you like to set the ${subwayLine} as your default?</p>",
  },
  setWhichFavorite: {
    ssml: "<p>Which line would you like to set as your default?</p>",
  },
  favoriteLineIsSet: {
    ssml:
      "<p>You're all set. Next time you open this skill, I'll jump right to updating you on the ${subwayLine}. See you then.</p>",
  },
  moreInfo: {
    ssml:
      '<p>For the full report and to see the affected subway stations, visit <sub alias="M.T.A. dot info">MTA.info</sub>.</p>',
  },
  cannotReachMTA: {
    ssml:
      "<p>Sorry, I'm having trouble connecting to the M.T.A.. Try again later.</p>",
  },
};
