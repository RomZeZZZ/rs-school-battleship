import { roomData } from "../db/db.js";

export default function AddUserToRoom (indexRoom, clientId) {
    let isConnected = false;
    let room = roomData.find(room => room.roomId === indexRoom);
    let mainUserId = room.roomUsers[0].index;
    if (room) {
        let isUserInRoom = room.roomUsers.find(user => user.index === clientId);
        isConnected = isUserInRoom ? false : true;
    }
    if (isConnected) {
        let index = roomData.findIndex(item => item.roomId === indexRoom);
        if (index !== -1) {
            roomData.splice(index, 1);
        }
        let indexCurrentUserRoom = roomData.findIndex(item => item.roomId === clientId);
        if (indexCurrentUserRoom !== -1) {
            roomData.splice(indexCurrentUserRoom, 1);
        }
    }
    return isConnected ? mainUserId : false;
}