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
  const baseUrl = "https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination";
  const req = await fetch(`${baseUrl}/vax_malaysia.csv`);
  return await req.text();
};

const parseVaxCSV = async (csv, dates) => {
  const arr = csv.split(/\n/);
  return arr
      .filter((e) => {
        const data = e.split(",");
        return dates.includes(data[0]);
      })
      .map((e) => {
        const data = e.split(",");
        return {
          date: data[0],
          daily_partial: parseInt(data[1]),
          daily_full: parseInt(data[2]),
          daily_booster: parseInt(data[6]),
          cumul_partial: parseInt(data[7]),
          cumul_full: parseInt(data[8]),
          cumul: parseInt(data[9]),
          cumul_booster: parseInt(data[12]),
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
