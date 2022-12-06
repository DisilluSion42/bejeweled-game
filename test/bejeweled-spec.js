const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");
const Screen = require('../class/screen');

describe ('Bejeweled', function () {

  describe("setupBoard method", () => {

    Bejeweled.setupBoard(8, 8);

    it("should set up screen grid", () => {
      expect(Screen.numRows).to.eql(8);
      expect(Screen.numCols).to.eql(8);
    });

    it("should set up cursor grid", () => {
      expect(Bejeweled.cursor.numRows).to.eql(8);
      expect(Bejeweled.cursor.numCols).to.eql(8);
    });

  });

  // Add tests for a valid swap that matches 3
  describe("getCleared method", () => {

    let grid;

    it("should return coordinates of three in a row after swap", () => {
      grid = [['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍓', '🍇', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥'],
              ['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍇', '🍓', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥'],
              ['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍇', '🍓', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥'],
              ['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍇', '🍓', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥']]
      const coordinates = Bejeweled.getCleared(grid, 1, 0, 'right');
      expect(coordinates).to.eql([{row: 0, col: 1}, {row:1, col: 1}, {row: 2, col: 1}]);
    });

    it("should return coordinates of four in a row after swap", () => {
      grid = [['🍇', '🥝', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍓', '🍇', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥'],
              ['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍓', '🍇', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥'],
              ['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍇', '🍓', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥'],
              ['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍇', '🍓', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥']]
      const coordinates = Bejeweled.getCleared(grid, 2, 0, 'right');
      expect(coordinates).to.eql([{row: 1, col: 1}, {row:2, col: 1}, {row: 3, col: 1}, {row: 4, col: 1}]);
    });

    it("should return coordinates of five in a row after swap", () => {
      grid = [['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍓', '🍇', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥'],
              ['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍓', '🍇', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥'],
              ['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍇', '🍓', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥'],
              ['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍇', '🍓', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥']]
      const coordinates = Bejeweled.getCleared(grid, 2, 0, 'right');
      expect(coordinates).to.eql([{row: 0, col: 1}, {row: 1, col: 1},
                                  {row: 2, col: 1}, {row: 3, col: 1}, {row: 4, col: 1}]);
    });

    it("should return coordinates of cross combo after swap", () => {
      grid = [['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍓', '🍇', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥'],
              ['🥝', '🍇', '🍇', '🍇', '🍋', '🍓', '🥥', '🥝'],
              ['🍓', '🍇', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥'],
              ['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍇', '🍓', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥'],
              ['🥝', '🍇', '🥥', '🍋', '🍋', '🍓', '🥥', '🥝'],
              ['🍇', '🍓', '🍋', '🥥', '🥥', '🍋', '🍋', '🥥']]
      const coordinates = Bejeweled.getCleared(grid, 2, 0, 'right');
      expect(coordinates).to.eql([{row: 0, col: 1}, {row: 1, col: 1},
                                  {row: 2, col: 1}, {row: 3, col: 1}, {row: 4, col: 1},
                                  {row: 2, col: 2}, {row: 2, col: 3}]);
    });

  });

  // Add tests for swaps that set up combos

  // Add tests to check if there are no possible valid moves

});
