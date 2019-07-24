import { expect } from "chai";
import determineActionDialog from "handlers/play/gameActions/interact/determineActionDialog";
import personal from "responses/inventories/personal";
import dungeon from "responses/rooms/dungeon";
import global from "responses/inventories/global";

describe("determineActionDialog", () => {
  describe("with item in personal inventory", () => {
    it("returns the personal inventory item dialog", () => {
      const lookTrinketDialog = determineActionDialog(
        "trinket",
        "look",
        ["trinket"],
        "dungeon"
      );
      expect(lookTrinketDialog).to.deep.eq(personal.trinket.look[0]);

      const giveTrinketDialog = determineActionDialog(
        "trinket",
        "give",
        ["trinket"],
        "dennis"
      );

      expect(giveTrinketDialog).to.deep.eq(personal.trinket.give[0]);
    });
  });

  describe("with item in room", () => {
    it("returns the room item dialog", () => {
      const takeYeFlaskDialog = determineActionDialog(
        "flask",
        "take",
        [],
        "dungeon"
      );
      expect(takeYeFlaskDialog).to.deep.eq(dungeon.items.flask.take[1]);
    });
  });

  describe("with trigger item in inventory", () => {
    it("returns the triggered dialog", () => {
      const takeYeFlaskDialog = determineActionDialog(
        "flask",
        "take",
        ["flask"],
        "dungeon"
      );
      expect(takeYeFlaskDialog).to.deep.eq(dungeon.items.flask.take[0]);
    });
  });

  describe("with item globally available", () => {
    it("returns the global item", () => {
      const daggerDialog = determineActionDialog(
        "dagger",
        "take",
        [],
        "parapets"
      );
      expect(daggerDialog).to.deep.eq(global.dagger.take[0]);
    });
  });
});
