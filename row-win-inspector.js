export class RowWinInspector {
  constructor(col1, col2, col3, col4) {
    this.col1 = col1;
    this.col2 = col2;
    this.col3 = col3;
    this.col4 = col4;
  }
  inspect() {
    for (let i = 5; i >= 0; i--) {
      if (this.col1.getTokenAt(i) === null) {
        return 0;
      }
      if (
        this.col1.getTokenAt(i) === this.col2.getTokenAt(i) &&
        this.col1.getTokenAt(i) === this.col3.getTokenAt(i) &&
        this.col1.getTokenAt(i) === this.col4.getTokenAt(i)
      ) {
        return this.col1.getTokenAt(i);
      }
    }
    return 0;
  }
}
