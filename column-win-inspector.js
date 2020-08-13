export class ColumnWinInspector {
  constructor(column) {
    this.column = column;
  }
  inspect() {
    const arr = this.column.tokens;
    for (let i = 0; i < 3; i++) {
      let chunk = arr.slice(i, i + 4);

      if (!chunk.includes(0) && !chunk.includes(2)) {
        return 1;
      }
      if (!chunk.includes(0) && !chunk.includes(1)) {
        return 2;
      }
    }
    return 0;
  }
}
