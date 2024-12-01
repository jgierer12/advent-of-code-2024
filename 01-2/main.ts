const input = await Deno.readTextFile("./input.txt");

let leftList: number[] = [], rightList: number[] = [];

const insert = (n: number, list: number[]) => {
  let i = list.findIndex((x) => x > n);
  if (i < 0) i = list.length;
  return [...list.slice(0, i), n, ...list.slice(i)];
};

input.matchAll(/^(\d+)\s+(\d+)$/gm)?.forEach((match) => {
  const left = parseInt(match[1]), right = parseInt(match[2]);
  leftList = insert(left, leftList);
  rightList = insert(right, rightList);
});

let score = 0;
leftList.forEach((left) => {
  let count = 0;
  rightList.forEach((right) => {
    if (right === left) count += 1;
  });

  score += left * count;
});

console.log(score);
