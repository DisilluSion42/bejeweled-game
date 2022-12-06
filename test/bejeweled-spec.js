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

  describe("clear method", () => {

    it("should clear 3 or 4 or 5 matched elements to ' '", () => {
      let grid = [[3, 1, 1, 1, 1, 1, 2],
                  [4, 1, 6, 6, 6, 7, 8],
                  [7, 1, 8, 9, 9, 9 ,9],
                  [1, 1, 3, 4, 5, 6, 7]];
      Bejeweled.clear(grid);
      expect(grid).to.eql([ [3, ' ', ' ', ' ', ' ', ' ', 2],
                            [4, ' ', ' ', ' ', ' ', 7, 8],
                            [7, ' ', 8, ' ', ' ', ' ' ,' '],
                            [1, ' ', 3, 4, 5, 6, 7]]);
    });

  });

  describe("drop method", () => {

    it("should drop items into the grid", () => {
      let grid = [[' ', 2, ' '],
                  [4, ' ', ' '],
                  [' ', ' ', ' ']];
      Bejeweled.drop(grid);
      grid.forEach(el => {
        expect(el).to.not.eq(' ');
      });
    });

  });

  describe("refill method", () => {

    it("should refill the grid", () => {
      let grid = [[' ', 2, ' '],
                  [4, ' ', ' '],
                  [' ', ' ', ' ']];
      Bejeweled.refill(grid);
      expect(Bejeweled.clear(grid)).to.be.false;
    });

  });

});
