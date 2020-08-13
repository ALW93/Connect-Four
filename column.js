export class Column {
  constructor() {
    this.tokens = [0, 0, 0, 0, 0, 0];
  }

  add(playerNum) {
    const arr = this.tokens;
    for (let i = arr.length; i >= 0; i--) {
      if (arr[i] === 0) {
        arr[i] = playerNum;
        break;
      }
    }
  }

  getTokenAt(rowIndex) {
    if (!this.tokens[rowIndex] || rowIndex > 5) {
      return null;
    } else {
      return this.tokens[rowIndex];
    }
  }

  isFull() {
    return !this.tokens.includes(0);
  }
}
