const input = await Deno.readTextFile("./input.txt");

let enable = 1;
const result = input.matchAll(
  /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g,
).reduce((acc, match) => {
  switch (match[0]) {
    case "do()":
      enable = 1;
      return acc;
    case "don't()":
      enable = 0;
      return acc;
    default:
      return acc + enable * parseInt(match[1]) * parseInt(match[2]);
  }
}, 0);

console.log(result);
