const input = await Deno.readTextFile("./input.txt");

const reports = input.trim().split("\n").map((line) =>
  line.split(" ").map((s) => parseInt(s))
);

const validate = (report: number[]) => {
  let lastInterval;
  for (let i = 0; i < report.length - 1; i++) {
    const interval = report[i + 1] - report[i];
    if (
      Math.abs(interval) > 3 || Math.abs(interval) < 1 ||
      (lastInterval && Math.sign(interval) !== Math.sign(lastInterval))
    ) {
      return false;
    }
    lastInterval = interval;
  }
  return true;
};

let count = 0;
reports.forEach((report) => {
  if (validate(report)) count += 1;
});

console.log(count);
