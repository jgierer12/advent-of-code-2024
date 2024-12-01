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

let distance = 0;
leftList.forEach((left, i) => {
  const right = rightList[i];
  distance += Math.abs(left - right);
});

console.log(distance);
