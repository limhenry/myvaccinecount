const functions = require("firebase-functions");
const Twitter = require("twitter-lite");

const config = {
  twitterToken: functions.config().myvaccinecount.twittertoken,
  twitterConsumerKey: functions.config().myvaccinecount.twitterconsumerkey,
  twitterConsumerSecret: functions.config().myvaccinecount.twitterconsumersecret,
  twitterAccessTokenKey: functions.config().myvaccinecount.twitteraccesstokenkey,
  twitterAccessTokenSecret: functions.config().myvaccinecount.twitteraccesstokensecret,
};

const twitterClient = new Twitter({
  subdomain: "api",
  version: "1.1",
  consumer_key: config.twitterConsumerKey,
  consumer_secret: config.twitterConsumerSecret,
  access_token_key: config.twitterAccessTokenKey,
  access_token_secret: config.twitterAccessTokenSecret,
});

const postToTwitter = async ({tweetStr, profileImg, headerImg}) => {
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
};

module.exports = postToTwitter;
