import { usersData } from "../db/db.js";
export default function RegResponse (data, ws) {
    let user = usersData.find(user => user.name === data.name);
    let error = false;
    let errorText = '';
    if (user && user.password !== data.password) {
        error = true;
        errorText = 'Wrong password';
    }
    if (!user) {
        user = {
            name: data.name,
            password: data.password,
            index: usersData.length + 1
        }
        usersData.push(user);
    }
    ws.clientId = user.index;
    return JSON.stringify({
        type: "reg",
        data: JSON.stringify({
            name: user.name,
            index: user.index,
            error: error,
            errorText: errorText,
        }),
        id: 0,
    });
}