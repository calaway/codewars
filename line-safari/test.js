const line = require("./solution");

function makeGrid(strings) {
  const grid = strings.map((string) => string.split(""));
  return grid;
}

function showGrid(grid) {
  console.log(grid.map((row) => row.join("")).join("\n"));
}

describe("Example Tests", function () {
  // "Good" examples from the Kata description.
  // ------------------------------------------

  describe("Good", function () {
    it("ex good #1", function () {
      var grid = makeGrid([
        "           ",
        "X---------X",
        "           ",
        "           ",
      ]);
      showGrid(grid);
      var actual = line(grid);
      expect(actual).toBe(true);
    });

    it("ex good #2", function () {
      var grid = makeGrid(["     ", "  X  ", "  |  ", "  |  ", "  X  "]);
      showGrid(grid);
      var actual = line(grid);
      expect(actual).toBe(true);
    });

    it("ex good #3", function () {
      var grid = makeGrid([
        "                    ",
        "     +--------+     ",
        "  X--+        +--+  ",
        "                 |  ",
        "                 X  ",
        "                    ",
      ]);
      showGrid(grid);
      var actual = line(grid);
      expect(actual).toBe(true);
    });

    it("ex good #4", function () {
      var grid = makeGrid([
        "                     ",
        "    +-------------+  ",
        "    |             |  ",
        " X--+      X------+  ",
        "                     ",
      ]);
      showGrid(grid);
      var actual = line(grid);
      expect(actual).toBe(true);
    });

    it("ex good #5", function () {
      var grid = makeGrid([
        "                      ",
        "   +-------+          ",
        "   |      +++---+     ",
        "X--+      +-+   X      ",
      ]);
      showGrid(grid);
      var actual = line(grid);
      expect(actual).toBe(true);
    });
  });

  // "Bad" examples from the Kata description.
  // -----------------------------------------

  describe("Bad", function () {
    it("ex bad #1", function () {
      var grid = makeGrid(["X-----|----X"]);
      showGrid(grid);
      var actual = line(grid);
      expect(actual).toBe(false);
    });

    xit("ex bad #2", function () {
      var grid = makeGrid([" X  ", " |  ", " +  ", " X  "]);
      showGrid(grid);
      var actual = line(grid);
      expect(actual).toBe(false);
    });

    xit("ex bad #3", function () {
      var grid = makeGrid([
        "   |--------+    ",
        "X---        ---+ ",
        "               | ",
        "               X ",
      ]);
      showGrid(grid);
      var actual = line(grid);
      expect(actual).toBe(false);
    });

    xit("ex bad #4", function () {
      var grid = makeGrid([
        "              ",
        "   +------    ",
        "   |          ",
        "X--+      X   ",
        "              ",
      ]);
      showGrid(grid);
      var actual = line(grid);
      expect(actual).toBe(false);
    });

    xit("ex bad #5", function () {
      var grid = makeGrid([
        "      +------+",
        "      |      |",
        "X-----+------+",
        "      |       ",
        "      X       ",
      ]);
      showGrid(grid);
      var actual = line(grid);
      expect(actual).toBe(false);
    });
  });
});
