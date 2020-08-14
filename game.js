import { Column } from "./column.js";
import { ColumnWinInspector } from "./column-win-inspector.js";
import { RowWinInspector } from "./row-win-inspector.js";
import { DiagonalWinInspector } from "./diagonal-win-inspector.js";

export class Game {
  constructor(playerOneName, playerTwoName) {
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;
    this.currentPlayer = 1;
    this.columns = [];
    for (let i = 0; i < 7; i++) {
      this.columns.push(new Column());
    }
    this.winnerNum = 0; // 3 for tie
  }

  getName() {
    if (this.winnerNum === 3) {
      return `${this.playerOneName} ties with ${this.playerTwoName}!`;
    } else if (this.winnerNum === 2) {
      return `${this.playerTwoName} wins!`;
    } else if (this.winnerNum === 1) {
      return `${this.playerOneName} wins!`;
    }
    return `${this.playerOneName} vs. ${this.playerTwoName}`;
  }

  playInColumn(index) {
    this.checkForTie();
    if (this.winnerNum === 0) {
      this.columns[index].add(this.currentPlayer);
      this.checkForColumnWin();
      this.checkForRowWin();
      this.checkForDiagonalWin();
    }

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
      if (this.isColumnFull(i)) {
        col.classList.add("full");
      } else {
        col.classList.remove("full");
      }
    }
  }

  isColumnFull(index) {
    if (this.winnerNum === 1 || this.winnerNum === 2) {
      return true;
    }
    return this.columns[index].isFull();
  }

  checkForTie() {
    for (let i = 0; i <= 6; i++) {
      if (!this.columns[i].isFull()) {
        return;
      }
    }
    this.winnerNum = 3;
  }

  checkForColumnWin() {
    for (let i = 0; i < 7; i++) {
      const colInspect = new ColumnWinInspector(this.columns[i]);
      if (colInspect.inspect() === 1 || colInspect.inspect() === 2) {
        this.winnerNum = colInspect.inspect();
        return;
      }
    }
  }

  checkForRowWin() {
    if (this.winnerNum > 0) {
      return;
    }
    for (let i = 0; i < 4; i++) {
      let args = this.columns.slice(i, i + 4);
      const rowInspect = new RowWinInspector(...args);
      if (rowInspect.inspect() > 0) {
        this.winnerNum = rowInspect.inspect();
        break;
      }
    }
  }

  checkForDiagonalWin() {
    if (this.winnerNum > 0) {
      return;
    }
    for (let i = 0; i < 4; i++) {
      let args = this.columns.slice(i, i + 4);
      const diagonalInspect = new DiagonalWinInspector(...args);
      if (diagonalInspect.inspect() > 0) {
        this.winnerNum = diagonalInspect.inspect();
        break;
      }
    }
  }

  setCurrentPlayer(number) {
    if (number === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  }
}
