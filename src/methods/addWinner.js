import { winnersData } from "../db/db.js";
import { usersData } from "../db/db.js";
export default function AddWinner (userId) {
    const userName = usersData.find(user => user.index === userId).name;
    const isUserInList = winnersData.find(user => user.index === userId);
    if (isUserInList) {
        let index = winnersData.findIndex(item => item.index === userId);
        winnersData[index].wins = winnersData[index].wins + 1;
    } else {
        winnersData.push(
            {
                name: userName,
                wins: 1
            }
        )
    }
}
