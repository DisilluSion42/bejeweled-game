const Screen = require("./screen");
const Cursor = require("./cursor");

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

    Screen.addCommand('up', "move the cursor up", Bejeweled.cursor.up.bind(Bejeweled.cursor));
    Screen.addCommand('down', "move the cursor down", Bejeweled.cursor.down.bind(Bejeweled.cursor));
    Screen.addCommand('left', "move the cursor left", Bejeweled.cursor.left.bind(Bejeweled.cursor));
    Screen.addCommand('right', "move the cursor right", Bejeweled.cursor.right.bind(Bejeweled.cursor));
    Screen.addCommand('d', 'select an item', Bejeweled.cursor.select.bind(Bejeweled.cursor));
    Screen.addCommand('f', 'swap items', function() {
      Bejeweled.cursor.swap.call(Bejeweled.cursor);
      Bejeweled.refill(Screen.grid);
    });

    Bejeweled.cursor.setBackgroundColor();
    Screen.render();
    Screen.printCommands();

  }

  static refill(grid) {
    Bejeweled.drop(grid);
    if(Bejeweled.clear(grid)) {
      Bejeweled.refill(grid);
    } else {
      return grid;
    }

    Screen.render();
  }

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

module.exports = Bejeweled;
