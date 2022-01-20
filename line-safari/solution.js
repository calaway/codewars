function line(grid) {
  grid = removeSpaces(grid);

  const [i1, j1, i2, j2] = indexOfXs(grid);

  const isPath = run(grid, i1, j1, null) || run(grid, i2, j2, null);

  return isPath;
}

function removeSpaces(grid) {
  return grid.map((row) => {
    return row.map((column) => {
      return column === " " ? null : column;
    });
  });
}

function indexOfXs(grid) {
  let i1, j1, i2, j2;
  grid.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column === "X") {
        i1 = i2;
        j1 = j2;
        i2 = rowIndex;
        j2 = columnIndex;
      }
    });
  });
  return [i1, j1, i2, j2];
}

function run(grid, i, j, from) {
  const current = grid[i][j];
  const dPad = {};

  dPad.up = grid[i - 1]?.[j];
  dPad.right = grid[i]?.[j + 1];
  dPad.down = grid[i + 1]?.[j];
  dPad.left = grid[i]?.[j - 1];

  dPad[from] = false;

  if (from === "down" && current === "+") {
    dPad.up = false;
  }
  if (from === "left" && current === "+") {
    dPad.right = false;
  }
  if (from === "up" && current === "+") {
    dPad.down = false;
  }
  if (from === "right" && current === "+") {
    dPad.left = false;
  }

  // console.log("i, j, from: ", i, j, from);
  // console.log("dPad: ", dPad);

  if (from === "up" && current === "+" && dPad.left && dPad.right) {
    return false;
  }
  if (from === "right" && current === "+" && dPad.up && dPad.down) {
    return false;
  }
  if (from === "down" && current === "+" && dPad.left && dPad.right) {
    return false;
  }
  if (from === "left" && current === "+" && dPad.up && dPad.down) {
    return false;
  }

  if (Object.values(dPad).includes("X")) {
    return true;
  } else if (dPad.up === "|" || dPad.up === "+") {
    i--;
    from = "down";
  } else if (dPad.right === "-" || dPad.right === "+") {
    j++;
    from = "left";
  } else if (dPad.down === "|" || dPad.down === "+") {
    i++;
    from = "up";
  } else if (dPad.left === "-" || dPad.left === "+") {
    j--;
    from = "right";
  } else {
    return false;
  }

  return run(grid, i, j, from);
}

module.exports = line;
