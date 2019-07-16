module.exports = {
  welcome: require("./sections/welcome"),
  play: require("./sections/play"),
  goodbye: require("./sections/goodbye"),
  exception: require("./sections/exception"),
  rooms: {
    global: require("./sections/rooms/global"),
    dungeon: require("./sections/rooms/dungeon"),
    parapets: require("./sections/rooms/parapets"),
    embankment: require("./sections/rooms/embankment"),
    dennis: require("./sections/rooms/dennis"),
  },
};
