import { RoomTypes } from "shared/types/slots";
import { Room } from "shared/types/rooms";
import dennis from "responses/rooms/dennis";
import dungeon from "responses/rooms/dungeon";
import embankment from "responses/rooms/embankment";
import parapets from "responses/rooms/parapets";

const rooms: { [Key in RoomTypes]: Room } = {
  dennis: dennis as Room,
  dungeon: dungeon as Room,
  embankment: embankment as Room,
  parapets: parapets as Room,
};

export default rooms;
