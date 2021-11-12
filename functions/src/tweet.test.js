const rewire = require("rewire");
const tweet = rewire("./tweet.js");

const getPercentage = tweet.__get__("getPercentage");
const getProgressBar = tweet.__get__("getProgressBar");
const population = 32657400;

describe("test: tweet.js", () => {
  test("getPercentage: 0 should equal to 0.00 (%)", () => {
    const percentage = getPercentage(0, population);
    expect(percentage).toBe("0.00");
  });

  test("getPercentage: 16,328,700 should equal to 50.00 (%)", () => {
    const percentage = getPercentage(16328700, population);
    expect(percentage).toBe("50.00");
  });

  test("getPercentage: 32,657,400 should equal to 100.00 (%)", () => {
    const percentage = getPercentage(32657400, population);
    expect(percentage).toBe("100.00");
  });

  test("getPercentage: 40,000,000 should equal to 122.48 (%)", () => {
    const percentage = getPercentage(40000000, population);
    expect(percentage).toBe("122.48");
  });

  test("getProgress: 0 people should equal to ░░░░░░░░░░", () => {
    const bar = getProgressBar(0, population);
    expect(bar).toBe("░░░░░░░░░░");
  });

  test("getProgress: 16,328,700 people should equal to ▓▓▓▓▓░░░░░", () => {
    const bar = getProgressBar(16328700, population);
    expect(bar).toBe("▓▓▓▓▓░░░░░");
  });

  test("getProgress: 32,657,400 people should equal to ▓▓▓▓▓▓▓▓▓▓", () => {
    const bar = getProgressBar(32657400, population);
    expect(bar).toBe("▓▓▓▓▓▓▓▓▓▓");
  });

  test("getProgress: 32,657,401 people should equal to ▓▓▓▓▓▓▓▓▓▓", () => {
    const bar = getProgressBar(32657401, population);
    expect(bar).toBe("▓▓▓▓▓▓▓▓▓▓");
  });

  // Making sure progress bar won't break if percentage is more than 100%
  test("getProgress: 40,000,000 people should equal to ▓▓▓▓▓▓▓▓▓▓", () => {
    const bar = getProgressBar(40000000, population);
    expect(bar).toBe("▓▓▓▓▓▓▓▓▓▓");
  });
});
