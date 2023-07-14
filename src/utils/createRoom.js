import { roomData } from "../db/db.js";
import { usersData } from "../db/db.js";

export default function CreateRoom (clientId) {
    let user = usersData.find(user => user.index === clientId);
    roomData.push(
        {
            roomId: clientId,
            roomUsers:
                [
                    {
                        name: user.name,
                        index: user.index,
                    }
                ],
        },
    )
}