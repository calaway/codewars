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
