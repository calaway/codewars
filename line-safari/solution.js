function line(grid) {
  let i, j;

  [i, j] = findX(grid);

  const isPath = run(grid, i, j, null);

  return isPath;
}

function findX(grid) {
  let i, j;
  i = grid.findIndex((row) => {
    j = row.findIndex((column) => column === "X");
    return j > -1;
  });
  return [i, j];
}

function run(grid, i, j, from) {
  const current = grid[i][j];
  let up, right, down, left;
  if (from === "up") {
    up = false;
  } else if (from === "down" && current === "+") {
    up = false;
  } else {
    up = grid[i - 1]?.[j];
  }
  if (from === "right") {
    right = false;
  } else if (from === "left" && current === "+") {
    right = false;
  } else {
    right = grid[i]?.[j + 1];
  }
  if (from === "down") {
    down = false;
  } else if (from === "up" && current === "+") {
    down = false;
  } else {
    down = grid[i + 1]?.[j];
  }
  if (from === "left") {
    left = false;
  } else if (from === "right" && current === "+") {
    left = false;
  } else {
    left = grid[i]?.[j - 1];
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
