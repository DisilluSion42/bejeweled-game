const Screen = require("./screen");
const Cursor = require("./cursor");
const { waitForInput } = require("./screen");

class Bejeweled {

  static playerTurn = false;
  static cursor = null;
  static items = ['🥝', '🍓', '🥥', '🍇', '🍊', '🍋'];

  static setupBoard(numRows, numCols) {

    Bejeweled.cursor = new Cursor(numRows, numCols);
    Screen.numRows = numRows;
    Screen.numCols = numCols;

  }

  static screenInitialize() {

    Screen.initialize();
    Screen.setGridlines(false);
    Bejeweled.refill(Screen.grid);
    // Bejeweled.clear()

    Screen.addCommand('up', "move the cursor up", Bejeweled.cursor.up.bind(Bejeweled.cursor));
    Screen.addCommand('down', "move the cursor down", Bejeweled.cursor.down.bind(Bejeweled.cursor));
    Screen.addCommand('left', "move the cursor left", Bejeweled.cursor.left.bind(Bejeweled.cursor));
    Screen.addCommand('right', "move the cursor right", Bejeweled.cursor.right.bind(Bejeweled.cursor));

    Bejeweled.cursor.setBackgroundColor();
    Screen.render();

  }

  static refill(grid) {
    Bejeweled.drop(grid);
    if(Bejeweled.clear(grid)) {
      Bejeweled.refill(grid);
    } else {
      return grid;
    }
  }

  // static getCleared(grid, row1, col1, swapDirection) {

  //   function clearedPush(cleared, coordinate) {

  //     for(let i = 0; i < cleared.length; i++) {
  //       if(coordinate.row === cleared[i].row && coordinate.col === cleared[i].col) return;
  //     }

  //     cleared.push(coordinate);

  //   }

  //   let row2 = row1;
  //   let col2 = col1;
  //   const numRows = grid.length;
  //   const numCols = grid[0].length;

  //   if(swapDirection === 'up') row2--;
  //   if(swapDirection === 'down') row2++;
  //   if(swapDirection === 'left') col2--;
  //   if(swapDirection === 'right') col2++;

  //   const upMargin = Math.max(Math.min(row1, row2) - 2, 0);
  //   const downMargin = Math.min(Math.max(row1, row2) + 2, numRows - 1)
  //   const leftMargin = Math.max(Math.min(col1, col2) - 2, 0);
  //   const rightMargin = Math.min(Math.max(col1, col2) + 2, numCols - 1);

  //   let cleared = [];

  //   // if swapped items in the same row
  //   if(row1 === row2) {

  //     for(let i = upMargin; i < downMargin - 1; i++) {

  //       if(grid[i][col1] === grid[i + 1][col1] && grid[i + 1][col1] === grid[i + 2][col1]) {
  //         for(let j = 0; j < 3; j++) {
  //           clearedPush(cleared, {row: i + j, col: col1});
  //         }
  //       }

  //       if(grid[i][col2] === grid[i + 1][col2] && grid[i + 1][col2] === grid[i + 2][col2]) {
  //         for(let j = 0; j < 3; j++) {
  //           clearedPush(cleared, {row: i + j, col: col2});
  //         }
  //       }

  //     }

  //     for(let j = leftMargin; j < rightMargin - 1; j++) {

  //       if(grid[row1][j] === grid[row1][j + 1] && grid[row1][j + 1] === grid[row1][j + 2]) {
  //         for(let i = 0; i < 3; i++) {
  //           clearedPush(cleared, {row: row1, col: j + i});
  //         }
  //       }

  //     }

  //   }

  //   // if swapped items in the same col
  //   if(col1 === col2) {

  //     for(let j = leftMargin; j < rightMargin - 1; j++) {

  //       if(grid[row1][j] === grid[row1][j + 1] && grid[row1][j + 1] === grid[row1][j + 2]) {
  //         for(let i = 0; i < 3; i++) {
  //           clearedPush(cleared, {row: row1, col: j + i});
  //         }
  //       }

  //       if(grid[row2][j] === grid[row2][j + 1] && grid[row2][j + 1] === grid[row2][j + 2]) {
  //         for(let i = 0; i < 3; i++) {
  //           clearedPush(cleared, {row: row2, col: j + i});
  //         }
  //       }

  //     }

  //     for(let i = upMargin; i < downMargin - 1; i++) {

  //       if(grid[i][col1] === grid[i + 1][col1] && grid[i + 1][col1] === grid[i + 2][col1]) {
  //         for(let j = 0; j < 3; j++) {
  //           clearedPush(cleared, {row: i + j, col: col1});
  //         }
  //       }

  //     }

  //   }

  //   return cleared;

  // }

  static clear(grid) {

    const numRows = grid.length;
    const numCols = grid[0].length;
    let toClear = [];

    function rowCheck(rowIdx) {

      let Row = grid[rowIdx];

      for(let i = 0; i < numCols - 2; i++) {
        if(Row[i] === Row[i + 1] && Row[i + 1] === Row[i + 2]) {
          toClear.push({row: rowIdx, col: i}, {row: rowIdx, col: i + 1}, {row: rowIdx, col: i + 2});
          i += 2;

          if(i < numCols - 1) {
            if(Row[i] === Row[i + 1]){
              toClear.push({row: rowIdx, col: i + 1});
              i++;
              if(i < numCols - 1) {
                if(Row[i] === Row[i + 1]) {
                  toClear.push({row: rowIdx, col: i + 1});
                  i++;
                  continue;
                } else {
                  break;
                }
              }
            }
          } else {
            break;
          }
        }
      }
    }

    function colCheck(colIdx) {

      let Col = [];
      for(let i = 0; i < numRows; i++) {
        Col.push(grid[i][colIdx]);
      }

      for(let i = 0; i < numRows - 2; i++) {
        if(Col[i] === Col[i + 1] && Col[i + 1] === Col[i + 2]) {
          toClear.push({row: i, col: colIdx}, {row: i + 1, col: colIdx}, {row: i + 2, col: colIdx});
          i += 2;

          if(i < numRows - 1) {
            if(Col[i] === Col[i + 1]){
              toClear.push({row: i + 1, col: colIdx});
              i++;
              if(i < numRows - 1) {
                if(Col[i] === Col[i + 1]) {
                  toClear.push({row: i + 1, col: colIdx});
                  i++;
                  continue;
                } else {
                  break;
                }
              }
            }
          } else {
            break;
          }
        }
      }
    }

    for(let i = 0; i < numRows; i++) {
      rowCheck(i);
    }

    for(let j = 0; j < numCols; j++) {
      colCheck(j);
    }

    toClear.forEach(rowcol => {
      grid[rowcol.row][rowcol.col] = ' ';
    });

    return toClear.length !== 0;

  }

  static randomItem() {

    const randomIdx = Math.floor(Math.random() * Bejeweled.items.length);

    return Bejeweled.items[randomIdx];

  }

  static drop(grid) {

    const numRows = grid.length;
    const numCols = grid[0].length;

    function columnDrop(col) {

      for(let i = numRows - 1; i > 0; i--) {
        if(grid[i][col] === ' ') {
          for(let j = i - 1; j >= 0; j--) {
            if(grid[j][col] !== ' ') {
              grid[i][col] = grid[j][col];
              grid[j][col] = ' ';
              break;
            }
          }

          if(grid[i][col] === ' ') grid[i][col] = Bejeweled.randomItem();
        }
      }

      if(grid[0][col] === ' ') grid[0][col] = Bejeweled.randomItem();

    }

    for(let j = 0; j < numCols; j++) columnDrop(j);

  }

}

// debugger
// let grid = [[3, 1, 1, 1, 1, 1, 2],
//                   [4, 1, 6, 6, 6, 7, 8],
//                   [7, 1, 8, 9, 9, 9 ,9],
//                   [1, 1, 3, 4, 5, 6, 7]];
// Bejeweled.clear(grid);
// console.log(grid);

// debugger
// Bejeweled.setupBoard(8, 8);
// Screen.initialize();
// Bejeweled.refill(Screen.grid);

module.exports = Bejeweled;
