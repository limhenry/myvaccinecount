const functions = require("firebase-functions");
const {TwitterApi} = require("twitter-api-v2");

const config = {
  appKey: functions.config().myvaccinecount.twitterconsumerkey,
  appSecret: functions.config().myvaccinecount.twitterconsumersecret,
  accessToken: functions.config().myvaccinecount.twitteraccesstokenkey,
  accessSecret: functions.config().myvaccinecount.twitteraccesstokensecret,
};

const client = new TwitterApi(config);

const postToTwitter = async ({tweetStr, profileImg, headerImg}) => {
  // const profileOptions = {
  //   image: profileImg.split(",")[1],
  // };

  // const headerOptions = {
  //   banner: headerImg.split(",")[1],
  //   width: 1500,
  //   height: 500,
  //   offset_left: 0,
  //   offset_top: 0,
  // };

  await Promise.all([
    client.v2.tweet(tweetStr),
    // Disable update profile image and banner due to missing support for v2
    // twitterClient.post("account/update_profile_image", profileOptions),
    // twitterClient.post("account/update_profile_banner", headerOptions),
  ]);
};

module.exports = postToTwitter;
