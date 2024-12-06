const input = await Deno.readTextFile("./input.txt");
const grid = input.trim().split("\n").map((line) => line.split(""));

const word = "XMAS".split("");

const directions = [
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
];

let count = 0;
grid.forEach((searchLine, searchY) => {
  searchLine.forEach((searchChar, searchX) => {
    if (searchChar !== word[0]) return;

    directions.forEach((direction) => {
      const isMatch = word.every((wordChar, i) => {
        const x = searchX + i * direction.x, y = searchY + i * direction.y;
        if (
          x < 0 || x > searchLine.length - 1 || y < 0 || y > grid.length - 1
        ) return false;
        const currentChar = grid[y][x];
        return currentChar === wordChar;
      });

      if (isMatch) count += 1;
    });
  });
});

console.log(count);
