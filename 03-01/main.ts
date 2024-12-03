const input = await Deno.readTextFile("./input.txt");

const result = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g).reduce(
  (acc, match) => acc + parseInt(match[1]) * parseInt(match[2]),
  0,
);

console.log(result);
