const input = await Deno.readTextFile("./input.txt");

const reports = input.trim().split("\n").map((line) =>
  line.split(" ").map((s) => parseInt(s))
);

const validateInterval = (interval: number, sign: number) =>
  Math.abs(interval) >= 1 && Math.abs(interval) <= 3 &&
  (sign === 0 || Math.sign(interval) === sign);

const validateReport = (report: number[]) => {
  let sign = 0;
  for (let i = 0; i < report.length - 1; i++) {
    const interval = report[i + 1] - report[i];
    if (!validateInterval(interval, sign)) {
      return { isValid: false, errorIndex: i };
    }
    sign = Math.sign(interval);
  }
  return { isValid: true, errorIndex: -1 };
};

let count = 0;
reports.forEach((report) => {
  const { isValid, errorIndex } = validateReport(report);
  if (
    isValid ||
    (validateReport([
      ...report.slice(0, errorIndex),
      ...report.slice(errorIndex + 1),
    ]).isValid) ||
    (errorIndex > 0 &&
      validateReport([
        ...report.slice(0, errorIndex - 1),
        ...report.slice(errorIndex),
      ]).isValid) ||
    (errorIndex < report.length - 1 &&
      validateReport([
        ...report.slice(0, errorIndex + 1),
        ...report.slice(errorIndex + 2),
      ]).isValid)
  ) {
    count += 1;
  }
});

console.log(count);
