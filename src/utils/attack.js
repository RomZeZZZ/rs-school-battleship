import Shot from "./shot.js";
import RandomShot from "./randomShot.js";
export default function Attack (data, isRandomAttack) {
    let shotData = data;
    if (isRandomAttack) {
        shotData = RandomShot(shotData);
    }
    const shotResponce = Shot(shotData);
    let responseArray = [];
    if (shotResponce.status === "killed") {
        shotResponce.coordinates.forEach(element => {
            responseArray.push(
                {
                    type: "attack",
                    data: JSON.stringify({
                      position: {
                        x: element.x,
                        y: element.y,
                      },
                      currentPlayer: data.indexPlayer,
                      status: shotResponce.status,
                    }),
                    id: 0,
                }
            )
        });
        shotResponce.coordinatesAround.forEach(element => {
            responseArray.push(
                {
                    type: "attack",
                    data: JSON.stringify({
                      position: {
                        x: element.x,
                        y: element.y,
                      },
                      currentPlayer: data.indexPlayer,
                      status: "miss",
                    }),
                    id: 0,
                }
            )
        });

    }
    const response = {
        type: "attack",
        data: JSON.stringify({
          position: {
            x: data.x,
            y: data.y,
          },
          currentPlayer: data.indexPlayer,
          status: shotResponce.status,
        }),
        id: 0,
    };
    if (shotResponce.status === "killed") {
        return {
            status: "killed",
            response: responseArray
        }
    } else if (shotResponce.status) {
        return {
            status: "shot",
            response: response
        }
    } else {
        return false;
    }

}