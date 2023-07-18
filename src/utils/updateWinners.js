import { winnersData } from "../db/db.js";
export default function UpdateWinners () {
    return (
        JSON.stringify({
            type: "update_winners",
            data:
            JSON.stringify(winnersData),
            id: 0,
        })
    )
}