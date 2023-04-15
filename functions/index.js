const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {getLatestDate, getVaxData} = require("./src/vaccine");
const tweet = require("./src/tweet");
const profile = require("./src/profile");
const header = require("./src/header");
const sendMessage = require("./src/telegram");
const postToTwitter = require("./src/twitter");
const postToMastodon = require("./src/mastodon");

admin.initializeApp();

const config = {
  reqToken: functions.config().myvaccinecount.reqtoken,
  telegramToken: functions.config().myvaccinecount.telegramtoken,
  telegramChatId: functions.config().myvaccinecount.telegramchatid,
  dbPath: functions.config().myvaccinecount.dbpath,
  totalPopulation: 32657100,
};

exports.getDailyProgressGitHub = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") return res.status(404).send();
  if (req.headers.authorization !== `Bearer ${config.reqToken}`) return res.status(401).send();

  try {
    const ref = admin.database().ref(config.dbPath);

    const dates = await getLatestDate(ref);
    const vax = await getVaxData(dates);
    const latestVax = vax[vax.length - 1];

    if (latestVax.date !== dates[0]) return res.send(false);
    if (vax.length !== 14) return res.send("malaysia-data-not-complete");

    const tweetStr = await tweet(latestVax, config.totalPopulation);
    const profileImg = await profile(latestVax, config.totalPopulation);
    const headerImg = await header(vax);

    postToMastodon({tweetStr, profileImg, headerImg});
    postToTwitter({tweetStr, profileImg, headerImg});

    await ref.child(dates[0]).set(true);
    await sendMessage(`${dates[0]}: OK`, config.telegramChatId, config.telegramToken);

    // For debug:
    // res.send(`
    //   <style>body{font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-seri;}</style>
    //   <div style="white-space: pre-line;">${tweetStr}</div>
    //   <img style="display: block; border-radius: 50%;" src="${profileImg}">
    //   <img style="display: block;" src="${headerImg}">
    // `);

    return res.send(true);
  } catch (e) {
    console.log(e);
    await sendMessage(`️🚨🚨🚨 ERROR 🚨🚨🚨\n\n${e.stack}`, config.telegramChatId, config.telegramToken);
    return res.status(500).send(false);
  }
});
