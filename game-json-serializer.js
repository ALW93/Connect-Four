export class GameJsonSerializer {
  constructor(game) {
    this.game = game;
  }

  serialize(num) {
    const player1 = this.game.playerOneName;
    const player2 = this.game.playerTwoName;
    const state = localStorage.getItem("save-data");
    let data;
    if (state) {
      data = JSON.parse(state);
    } else {
      data = {
        "player-one": player1,
        "player-two": player2,
        "my-board": [],
      };
    }

    data["my-board"].push(num);
    localStorage.setItem("save-data", JSON.stringify(data));
  }
}
