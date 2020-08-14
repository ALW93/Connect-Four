import { Game } from "./game.js";

export class GameJsonDeserializer {
  constructor(JSONstring) {
    this.JSONstring = JSONstring;
  }

  deserialize() {
    let parsed = JSON.parse(this.JSONstring);

    let newGame = new Game(parsed["player-one"], parsed["player-two"]);
    const board = parsed["my-board"];

    board.forEach((col) => newGame.playInColumn(col));
    return newGame;
  }
}
