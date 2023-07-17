export default function CellsAroundShips (shipsPositions) {
    function getCoordinatesAroundShip(oneShip) {
        const surroundingCoordinates = [];
        oneShip.forEach(coord => {
          const [x, y] = coord;
          for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
              if ((i !== x || j !== y) && i >= 0 && i < 10 && j >= 0 && j < 10) {
                surroundingCoordinates.push([i, j]);
              }
            }
          }
        });
        let uniqueMatrix = [...new Set(surroundingCoordinates.map(JSON.stringify))].map(JSON.parse);
        return uniqueMatrix; 
    }
    const coordinatesAroundShips = shipsPositions.map(ship => getCoordinatesAroundShip(ship));
    return coordinatesAroundShips;
}
