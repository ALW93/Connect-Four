export class GameJsonSerializer {
  constructor(game) {
    this.game = game;
  }

  serialize() {
    //build data
    let boardArr = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        let token = this.game.getTokenAt(i, j);
        boardArr.push([i, j, token]);
      }
    }

    const player1 = this.game.playerOneName;
    const player2 = this.game.playerTwoName;

    const currentTurn = this.game.currentPlayer;

    let data = {
      "player-one": player1,
      "player-two": player2,
      "current-turn": currentTurn,
      "my-board": boardArr,
    };

    // console.log(JSON.stringify(data));
    return JSON.stringify(data);
  }
}
