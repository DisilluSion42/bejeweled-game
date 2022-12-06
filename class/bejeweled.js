const Screen = require("./screen");
const Cursor = require("./cursor");
const { waitForInput } = require("./screen");

class Bejeweled {

  static playerTurn = false;
  static cursor = null;

  static setupBoard(numRows, numCols) {

    Bejeweled.cursor = new Cursor(numRows, numCols);
    Screen.numRows = numRows;
    Screen.numCols = numCols;

  }

  static screenInitialize() {

    Screen.initialize();
    Screen.setGridlines(false);

    Screen.addCommand('up', "move the cursor up", Bejeweled.cursor.up.bind(Bejeweled.cursor));
    Screen.addCommand('down', "move the cursor down", Bejeweled.cursor.down.bind(Bejeweled.cursor));
    Screen.addCommand('left', "move the cursor left", Bejeweled.cursor.left.bind(Bejeweled.cursor));
    Screen.addCommand('right', "move the cursor right", Bejeweled.cursor.right.bind(Bejeweled.cursor));

    Bejeweled.cursor.setBackgroundColor();
    Screen.render();

  }

  static getCleared(grid, row1, col1, swapDirection) {

    function clearedPush(cleared, coordinate) {

      for(let i = 0; i < cleared.length; i++) {
        if(coordinate.row === cleared[i].row && coordinate.col === cleared[i].col) return;
      }

      cleared.push(coordinate);

    }

    let row2 = row1;
    let col2 = col1;
    const numRows = grid.length;
    const numCols = grid[0].length;

    if(swapDirection === 'up') row2--;
    if(swapDirection === 'down') row2++;
    if(swapDirection === 'left') col2--;
    if(swapDirection === 'right') col2++;

    const upMargin = Math.max(Math.min(row1, row2) - 2, 0);
    const downMargin = Math.min(Math.max(row1, row2) + 2, numRows - 1)
    const leftMargin = Math.max(Math.min(col1, col2) - 2, 0);
    const rightMargin = Math.min(Math.max(col1, col2) + 2, numCols - 1);

    let cleared = [];

    // if swapped items in the same row
    if(row1 === row2) {

      for(let i = upMargin; i < downMargin - 1; i++) {

        if(grid[i][col1] === grid[i + 1][col1] && grid[i + 1][col1] === grid[i + 2][col1]) {
          for(let j = 0; j < 3; j++) {
            clearedPush(cleared, {row: i + j, col: col1});
          }
        }

        if(grid[i][col2] === grid[i + 1][col2] && grid[i + 1][col2] === grid[i + 2][col2]) {
          for(let j = 0; j < 3; j++) {
            clearedPush(cleared, {row: i + j, col: col2});
          }
        }

      }

      for(let j = leftMargin; j < rightMargin - 1; j++) {

        if(grid[row1][j] === grid[row1][j + 1] && grid[row1][j + 1] === grid[row1][j + 2]) {
          for(let i = 0; i < 3; i++) {
            clearedPush(cleared, {row: row1, col: j + i});
          }
        }

      }

    }

    // if swapped items in the same col
    if(col1 === col2) {

      for(let j = leftMargin; j < rightMargin - 1; j++) {

        if(grid[row1][j] === grid[row1][j + 1] && grid[row1][j + 1] === grid[row1][j + 2]) {
          for(let i = 0; i < 3; i++) {
            clearedPush(cleared, {row: row1, col: j + i});
          }
        }

        if(grid[row2][j] === grid[row2][j + 1] && grid[row2][j + 1] === grid[row2][j + 2]) {
          for(let i = 0; i < 3; i++) {
            clearedPush(cleared, {row: row2, col: j + i});
          }
        }

      }

      for(let i = upMargin; i < downMargin - 1; i++) {

        if(grid[i][col1] === grid[i + 1][col1] && grid[i + 1][col1] === grid[i + 2][col1]) {
          for(let j = 0; j < 3; j++) {
            clearedPush(cleared, {row: i + j, col: col1});
          }
        }

      }

    }

    return cleared;

  }

}

module.exports = Bejeweled;
