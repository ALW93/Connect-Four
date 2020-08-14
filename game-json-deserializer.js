import { Game } from "./game.js";

export class GameJsonDeserializer {
  constructor(JSONstring) {
    this.JSONstring = JSONstring;
  }

  deserialize() {
    let parsed = JSON.parse(this.JSONstring);

    let newGame = new Game(parsed["player-one"], parsed["player-two"]);
    const board = parsed["my-board"];
    const filtered = board.filter((slot) => slot[2] !== null);
    console.log(filtered);
    for (let i = 0; i < filtered.length; i++) {
      let slot = filtered[i];
      let row = slot[1];
      newGame.setCurrentPlayer(slot[2]);
      newGame.playInColumn(row);
    }
    return newGame;
  }
}

//'/ {"player-one":"dwa","player-two":"a","current-turn":1,"my-board":[[0,0,null],[0,1,null],[0,2,null],[0,3,null],[0,4,null],[0,5,null],[0,6,null],[1,0,null],[1,1,null],[1,2,null],[1,3,null],[1,4,null],[1,5,null],[1,6,null],[2,0,null],[2,1,null],[2,2,null],[2,3,null],[2,4,null],[2,5,null],[2,6,null],[3,0,null],[3,1,2],[3,2,null],[3,3,null],[3,4,null],[3,5,null],[3,6,null],[4,0,null],[4,1,1],[4,2,null],[4,3,null],[4,4,null],[4,5,null],[4,6,null],[5,0,1],[5,1,2],[5,2,null],[5,3,null],[5,4,null],[5,5,null],[5,6,null]]}

//parse the array and pass those values into
// [x,y,playernum]
