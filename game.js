import { Column } from "./column.js";

export class Game {
  constructor(playerOneName, playerTwoName) {
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;
    this.currentPlayer = 1;
    this.columns = [];
    for (let i = 0; i < 7; i++) {
      this.columns.push(new Column());
    }
  }

  getName() {
    return `${this.playerOneName} vs. ${this.playerTwoName}`;
  }

  playInColumn(index) {
    this.columns[index].add(this.currentPlayer);

    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  }

  getTokenAt(rowIndex, colIndex) {
    return this.columns[colIndex].getTokenAt(rowIndex);
  }

  updateUI() {
    const clickTarget = document.getElementById("click-targets");
    if (this.currentPlayer === 1) {
      clickTarget.classList.add("red");
      clickTarget.classList.remove("black");
    } else {
      clickTarget.classList.remove("red");
      clickTarget.classList.add("black");
    }

    for (let i = 5; i >= 0; i--) {
      for (let j = 0; j <= 6; j++) {
        const square = document.getElementById(`square-${i}-${j}`);
        const playerNum = this.getTokenAt(i, j);
        square.innerHTML = "";
        if (playerNum === 1) {
          const blackToken = document.createElement("div");
          blackToken.setAttribute("class", "token red");
          square.appendChild(blackToken);
        } else if (playerNum === 2) {
          const redToken = document.createElement("div");
          redToken.setAttribute("class", "token black");
          square.appendChild(redToken);
        }
      }
    }

    for (let i = 0; i <= 6; i++) {
      const col = document.getElementById(`column-${i}`);
      if (this.columns[i].isFull()) {
        col.classList.add("full");
      } else {
        col.classList.remove("full");
      }
    }
  }
}
