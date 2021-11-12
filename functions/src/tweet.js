const getPercentage = (value, population) => {
  return (value / population * 100).toFixed(2);
};

const getProgressBar = (value, population) => {
  const full = "▓";
  const empty = "░";
  const width = 10;
  const pop = Math.min(Math.max(value, 0), population);
  const progress = pop / population * 100;
  const progressInt = Math.floor(progress * width / 100);
  const restInt = width - progressInt;

  return `${full.repeat(progressInt)}${empty.repeat(restInt)}`;
};

const getTweetData = (data, population) => {
  const dateOptions = {
    timeZone: "Asia/Kuala_Lumpur",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };
  const date = new Date(data.date).toLocaleDateString("en-GB", dateOptions);
  const nf = new Intl.NumberFormat();

  const tweetData = {
    // First Section
    partial_pct: getPercentage(data.cumul_partial, population),
    partial_pp: getPercentage(data.daily_partial, population),
    partial_bar: getProgressBar(data.cumul_partial, population),
    fully_pct: getPercentage(data.cumul_full, population),
    fully_pp: getPercentage(data.daily_full, population),
    fully_bar: getProgressBar(data.cumul_full, population),
    // booster_pct: getPercentage(data.cumul_booster, population),
    // booster_pp: getPercentage(data.daily_booster, population),
    // booster_bar: getProgressBar(data.cumul_booster, 10, population),
    // Second Section
    cumul_partial: nf.format(data.cumul_partial),
    daily_partial: nf.format(data.daily_partial),
    cumul_full: nf.format(data.cumul_full),
    daily_full: nf.format(data.daily_full),
    cumul_booster: nf.format(data.cumul_booster),
    daily_booster: nf.format(data.daily_booster),
    // Third Section
    cumul_total: nf.format(data.cumul),
    cumul_daily: nf.format(data.daily_partial + data.daily_full + data.daily_booster),
    // Forth Section
    date,
  };
  return tweetData;
};

const getTweet = (data, population) => {
  const e = getTweetData(data, population);

  const arr = [
    `At Least 1 Dose: ${e.partial_pct}% (+${e.partial_pp} pp)`,
    `${e.partial_bar}`,
    "",
    `Fully Vax: ${e.fully_pct}% (+${e.fully_pp} pp)`,
    `${e.fully_bar}`,
    "",
    `At Least 1 Dose: ${e.cumul_partial} (+${e.daily_partial})`,
    `Fully Vax: ${e.cumul_full} (+${e.daily_full})`,
    `Booster: ${e.cumul_booster} (+${e.daily_booster})`,
    "",
    `Total: ${e.cumul_total} (+${e.cumul_daily})`,
    "",
    `(As of ${e.date}, 23:59)`,
  ];

  return arr.join("\n");
};

module.exports = getTweet;
