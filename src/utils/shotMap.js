import CreateField from "../methods/createField.js";
export default function ShotMap (shipsPositions) {
    let shipsMap = CreateField();
    shipsPositions.forEach(element => {
        if (element.direction) {
            for (let index = element.position.y; index < element.position.y + element.length; index++) {
                shipsMap[index][element.position.x] = element.length;
            }
        } else {
            for (let index = element.position.x; index < element.position.x + element.length; index++) {
                shipsMap[element.position.y][index] = element.length;
            }
        }
    });
    return shipsMap;
}