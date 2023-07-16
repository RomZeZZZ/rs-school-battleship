export default function ShotMap (shipsPositions) {
    let shipsMap = [];
    shipsPositions.forEach(element => {
        let ship = [];
        ship.push([element.position.x, element.position.y]);
        for (let index = 1; index < element.length; index++) {
           if (element.direction) {
            ship.push([element.position.x, element.position.y + index]);
           } else {
            ship.push([element.position.x + index, element.position.y]);
           }
        }
        shipsMap.push(ship);
    });
    return shipsMap;
}