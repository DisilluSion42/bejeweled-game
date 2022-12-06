const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.selectedRow = null;
    this.selectedCol = null;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {

    if(this.row > 0) {
      if(this.row !== this.selectedRow || this.col !== this.selectedCol) this.resetBackgroundColor();
      this.row--;
      if(this.row !== this.selectedRow || this.col !== this.selectedCol) this.setBackgroundColor();
      Screen.render();
    }

  }

  down() {

    if(this.row < this.numRows - 1) {
      if(this.row !== this.selectedRow || this.col !== this.selectedCol) this.resetBackgroundColor();
      this.row++;
      if(this.row !== this.selectedRow || this.col !== this.selectedCol) this.setBackgroundColor();
      Screen.render();
    }

  }

  left() {

    if(this.col > 0) {
      if(this.row !== this.selectedRow || this.col !== this.selectedCol) this.resetBackgroundColor();
      this.col--;
      if(this.row !== this.selectedRow || this.col !== this.selectedCol) this.setBackgroundColor();
      Screen.render();
    }

  }

  right() {

    if(this.col < this.numCols - 1) {
      if(this.row !== this.selectedRow || this.col !== this.selectedCol) this.resetBackgroundColor();
      this.col++;
      if(this.row !== this.selectedRow || this.col !== this.selectedCol) this.setBackgroundColor();
      Screen.render();
    }

  }

  select() {

    if(this.selectedRow === null && this.selectedCol === null){
      this.selectedRow = this.row;
      this.selectedCol = this.col;
      Screen.setBackgroundColor(this.selectedRow, this.selectedCol, 'cyan');
      Screen.render();
    } else {
      Screen.setMessage(`Sorry, you have already selected an item. \nMove cursor and press 'f' to swap with an adjacent item.`);
      Screen.render();
    }

  }

  swap() {
    if(this.selectedRow === null) {
      Screen.setMessage(`Please press 'd' to select an time first. `);
      Screen.render();
    } else {
      if(Math.abs(this.row - this.selectedRow) + Math.abs(this.col - this.selectedCol) !== 1) {
        Screen.setMessage(`Please swap with an adjacent item. `);
        Screen.render();
      } else {
        const toSwap = Screen.grid[this.row][this.col];
        Screen.grid[this.row][this.col] = Screen.grid[this.selectedRow][this.selectedCol];
        Screen.grid[this.selectedRow][this.selectedCol] = toSwap;

        // this.setBackgroundColor();
        Screen.setBackgroundColor(this.selectedRow, this.selectedCol, this.gridColor);
        Screen.render();

        this.selectedRow = null;
        this.selectedCol = null;
      }
    }
  }

}


module.exports = Cursor;
