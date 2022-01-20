function line(grid) {
  const [i1, j1, i2, j2] = indexOfXs(grid);

  const isPath = run(grid, i1, j1, null) || run(grid, i2, j2, null);

  return isPath;
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
  let up, right, down, left;
  if (from === "up") {
    up = false;
  } else if (from === "down" && current === "+") {
    up = false;
  } else if (grid[i - 1]?.[j] === " ") {
    up = false;
  } else {
    up = grid[i - 1]?.[j];
  }
  if (from === "right") {
    right = false;
  } else if (from === "left" && current === "+") {
    right = false;
  } else if (grid[i]?.[j + 1] === " ") {
    right = false;
  } else {
    right = grid[i]?.[j + 1];
  }
  if (from === "down") {
    down = false;
  } else if (from === "up" && current === "+") {
    down = false;
  } else if (grid[i + 1]?.[j] === " ") {
    down = false;
  } else {
    down = grid[i + 1]?.[j];
  }
  if (from === "left") {
    left = false;
  } else if (from === "right" && current === "+") {
    left = false;
  } else if (grid[i]?.[j - 1] === " ") {
    left = false;
  } else {
    left = grid[i]?.[j - 1];
  }

  if (from === "up" && current === "+" && left && right) {
    return false;
  }
  if (from === "right" && current === "+" && up && down) {
    return false;
  }
  if (from === "down" && current === "+" && left && right) {
    return false;
  }
  if (from === "left" && current === "+" && up && down) {
    return false;
  }

  console.log("i, j, from: ", i, j, from);
  console.log("[up, right, down, left]: ", [up, right, down, left]);

  if ([up, right, down, left].includes("X")) {
    return true;
  } else if (up === "|" || up === "+") {
    i--;
    from = "down";
  } else if (right === "-" || right === "+") {
    j++;
    from = "left";
  } else if (down === "|" || down === "+") {
    i++;
    from = "up";
  } else if (left === "-" || left === "+") {
    j--;
    from = "right";
  } else {
    return false;
  }

  return run(grid, i, j, from);
}

module.exports = line;
