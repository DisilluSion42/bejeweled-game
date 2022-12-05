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
  describe("checkForMatches method", () => {

    let grid;

    it("should return coordinates of ")
  });

  // Add tests for swaps that set up combos

  // Add tests to check if there are no possible valid moves

});
