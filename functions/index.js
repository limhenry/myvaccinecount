const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Twitter = require("twitter-lite");
const {getLatestDate, getVaxData} = require("./src/vaccine");
const tweet = require("./src/tweet");
const profile = require("./src/profile");
const header = require("./src/header");
const sendMessage = require("./src/telegram");

admin.initializeApp();

const config = {
  reqToken: functions.config().myvaccinecount.reqtoken,
  twitterToken: functions.config().myvaccinecount.twittertoken,
  twitterConsumerKey: functions.config().myvaccinecount.twitterconsumerkey,
  twitterConsumerSecret: functions.config().myvaccinecount.twitterconsumersecret,
  twitterAccessTokenKey: functions.config().myvaccinecount.twitteraccesstokenkey,
  twitterAccessTokenSecret: functions.config().myvaccinecount.twitteraccesstokensecret,
  telegramToken: functions.config().myvaccinecount.telegramtoken,
  telegramChatId: functions.config().myvaccinecount.telegramchatid,
  dbPath: functions.config().myvaccinecount.dbpath,
  totalPopulation: 32657400,
};

const twitterClient = new Twitter({
  subdomain: "api",
  version: "1.1",
  consumer_key: config.twitterConsumerKey,
  consumer_secret: config.twitterConsumerSecret,
  access_token_key: config.twitterAccessTokenKey,
  access_token_secret: config.twitterAccessTokenSecret,
});

exports.getDailyProgressGitHub = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") return res.status(404).send();
  if (req.headers.authorization !== `Bearer ${config.reqToken}`) return res.status(401).send();

  try {
    const ref = admin.database().ref(config.dbPath);

    const dates = await getLatestDate(ref);
    const vax = await getVaxData(dates);

    if (vax.slice(-1)[0].date !== dates[0]) return res.send(false);
    if (vax.length !== 14) return res.send("malaysia-data-not-complete");

    const tweetStr = await tweet(vax[vax.length - 1], config.totalPopulation);
    const profileImg = await profile(vax[vax.length - 1], config.totalPopulation);
    const headerImg = await header(vax);

    const profileOptions = {
      image: profileImg.split(",")[1],
    };
    const headerOptions = {
      banner: headerImg.split(",")[1],
      width: 1500,
      height: 500,
      offset_left: 0,
      offset_top: 0,
    };

    await Promise.all([
      twitterClient.post("statuses/update", {status: tweetStr}),
      twitterClient.post("account/update_profile_image", profileOptions),
      twitterClient.post("account/update_profile_banner", headerOptions),
    ]);

    await ref.child(dates[0]).set(true);
    await sendMessage(`${dates[0]}: OK`, config.telegramChatId, config.telegramToken);

    // For debug:
    // res.send(`
    //   <div style="white-space: pre-line;">${tweetStr}</div>
    //   <img style="display: block;" src="${profileImg}">
    //   <img style="display: block;" src="${headerImg}">
    // `);

    res.send(true);
  } catch (e) {
    console.log(e);
    await sendMessage(`️🚨🚨🚨 ERROR 🚨🚨🚨\n\n${e.stack}`, config.telegramChatId, config.telegramToken);
    return res.status(500).send(false);
  }
});
