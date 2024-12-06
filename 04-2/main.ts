const input = await Deno.readTextFile("./input.txt");
const grid = input.trim().split("\n").map((line) => line.split(""));

const word = "MAS".split("");
const wordMiddle = (word.length - 1) / 2;
if (wordMiddle % 1 !== 0) {
  throw new Error("word must have an odd number of letters");
}

const directions = [
  { x: 1, y: -1 },
  { x: 1, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: -1 },
];

let count = 0;
grid.forEach((searchLine, searchY) => {
  searchLine.forEach((searchChar, searchX) => {
    if (searchChar !== word[wordMiddle]) return;

    let matches = 0;
    directions.forEach((direction) => {
      const isMatch = word.every((wordChar, i) => {
        const distance = i - wordMiddle;
        const x = searchX + distance * direction.x,
          y = searchY + distance * direction.y;
        if (
          x < 0 || x > searchLine.length - 1 || y < 0 || y > grid.length - 1
        ) return false;
        const currentChar = grid[y][x];
        return currentChar === wordChar;
      });

      if (isMatch) matches += 1;
    });

    if (matches === 2) count += 1;
  });
});

console.log(count);
