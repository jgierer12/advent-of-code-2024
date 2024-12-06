const input = await Deno.readTextFile("./input.txt");

const [rulesStr, updatesStr] = input.trim().split("\n\n");

const rules = rulesStr.split("\n").map((line) =>
  line.split("|").map((x) => parseInt(x))
);
const updates = updatesStr.split("\n").map((line) =>
  line.split(",").map((x) => parseInt(x))
);

const invalidUpdates = updates.filter((update) => {
  for (const rule of rules) {
    const beforePage = rule[0], afterPage = rule[1];
    const beforeIndex = update.findIndex((page) => page === beforePage),
      afterIndex = update.findIndex((page) => page === afterPage);
    if (beforeIndex >= 0 && afterIndex >= 0 && afterIndex < beforeIndex) {
      return true;
    }
  }
  return false;
});

const fixedUpdates = invalidUpdates.map((update) =>
  update.sort((a, b) => {
    for (const rule of rules) {
      const beforePage = rule[0], afterPage = rule[1];
      if (a === beforePage && b === afterPage) return -1;
    }
    return 1;
  })
);

let result = 0;
for (const update of fixedUpdates) {
  const middlePage = update[(update.length - 1) / 2];
  result += middlePage;
}

console.log(result);
