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

    Bejeweled.cursor.setBackgroundColor();
    Screen.render();

  }

  static checkForMatches(grid, row, col, direction) {

    const numRows = grid.length;
    const numCols = grid[0].length;

    // iterate rows
    for(let row = 0; row < numRows; row++) {

      for(let col = 0; col < numCols - 2; col++) {

        // go to next one if the two are not the same
        if(grid[row][col] !== grid[row][col + 1]) continue;

        // go to the one after next if the next two are also not the same
        if(grid[row][col + 1] !== grid[row][col + 2]) {
          col++;
          continue;
        }

        // return true if the three match
        return true;

      }

    }

    // iterate columns
    for(let col = 0; col < numCols; col++) {

      for(let row = 0; row < numRows - 2; row++) {

        // go to next one if the two are not the same
        if(grid[row + 1][col] !== grid[row][col]) continue;

        // go to the one after next if the next two are also not the same
        if(grid[row + 1][col] !== grid[row + 2][col]) {
          row++;
          continue;
        }

        // return true if the three match
        return true;

      }

    }

    // return false if no match
    return false;

  }

}

module.exports = Bejeweled;
