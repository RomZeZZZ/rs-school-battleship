import { roomData } from "../db/db.js";
export default function UpdateRoom () {
    let rooms = roomData.filter(room => room.roomUsers.length === 1);
    return (
        JSON.stringify({
            type: "update_room",
            data:
            JSON.stringify(rooms),
            id: 0,
        })
    )
}
