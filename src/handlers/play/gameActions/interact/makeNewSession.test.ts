import { expect } from "chai";
import makeNewSession from "handlers/play/gameActions/interact/makeNewSession";
import { Session } from "shared/types/attributes";

describe("makeNewSession", () => {
  const oldSession = {
    visits: 0,
    state: "PLAY",
    score: 2,
    inventory: ["trinket"],
    curRoom: "dungeon",
    previous: {
      speech: "",
      reprompt: "",
      state: "PLAY",
    },
  } as Session;

  describe("when action is not take", () => {
    it("only updates score", () => {
      const newSession = makeNewSession(oldSession, "scroll", "look", 2);

      expect(newSession.score).to.eq(4);
      expect(newSession.inventory).to.deep.eq(["trinket"]);
    });
  });

  describe("when action is take and inventory is clean", () => {
    it("updates score and inventory", () => {
      const newSession = makeNewSession(oldSession, "scroll", "take", 2);

      expect(newSession.score).to.eq(4);
      expect(newSession.inventory).to.deep.eq(["trinket", "scroll"]);
    });
  });

  describe("when action is take and item was already taken", () => {
    it("only updates score", () => {
      const haveScroll = {
        ...oldSession,
        inventory: ["scroll", "trinket"],
      } as Session;
      const newSession = makeNewSession(haveScroll, "scroll", "take", 2);

      expect(newSession.score).to.eq(4);
      expect(newSession.inventory).to.deep.eq(["scroll", "trinket"]);
    });
  });
});
