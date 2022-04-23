const fetch = require("node-fetch");

const getLatestDate = async (ref) => {
  const latestData = (await ref.limitToLast(1).once("value")).val();
  const latestDate = Object.keys(latestData)[0];
  // For Debug:
  // const latestDate = "2021-11-10";

  const dates = [];
  for (let i = -1; i < 13; i++) {
    const newDate = new Date(latestDate);
    newDate.setDate(newDate.getDate() - i);
    dates.push(newDate.toISOString().split("T")[0]);
  }

  return dates;
};

const fetchVaxCSV = async () => {
  const baseUrl = "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/vaccination";
  const req = await fetch(`${baseUrl}/vax_malaysia.csv`);
  return await req.text();
};

const parseVaxCSV = async (csv, dates) => {
  const arr = csv.split(/\n/);
  const headers = arr[0].split(",");
  const index = {
    "date": 0,
    "daily_partial": 1,
    "daily_full": 2,
    "daily_booster": 3,
    "cumul_partial": 9,
    "cumul_full": 10,
    "cumul_booster": 11,
    "cumul": 12,
  };

  Object.keys(index).forEach((e) => {
    if (headers[index[e]] !== e) throw new Error("CSV headers are not correct");
  });

  return arr
      .filter((e) => {
        const data = e.split(",");
        return dates.includes(data[0]);
      })
      .map((e) => {
        const data = e.split(",");
        return {
          date: data[index.date],
          daily_partial: parseInt(data[index.daily_partial]),
          daily_full: parseInt(data[index.daily_full]),
          daily_booster: parseInt(data[index.daily_booster]),
          cumul_partial: parseInt(data[index.cumul_partial]),
          cumul_full: parseInt(data[index.cumul_full]),
          cumul_booster: parseInt(data[index.cumul_booster]),
          cumul: parseInt(data[index.cumul]),
        };
      });
};

const getVaxData = async (dates) => {
  const csv = await fetchVaxCSV();
  return await parseVaxCSV(csv, dates);
};

module.exports = {
  getLatestDate,
  getVaxData,
};
