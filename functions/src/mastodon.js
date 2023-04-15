const functions = require("firebase-functions");
const fetch = require("node-fetch");
const crypto = require("crypto");

const config = {
  mastodonaccesstoken: functions.config().myvaccinecount.mastodonaccesstoken,
};

const updateStatus = async ({tweetStr}) => {
  const hash = crypto.createHash("sha1").update(tweetStr).digest("hex");

  const statusesUrl = "https://mastodon.social/api/v1/statuses";
  await fetch(statusesUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.mastodonaccesstoken}`,
      "Idempotency-Key": hash,
    },
    body: JSON.stringify({
      status: tweetStr,
    }),
  });
};

const updateCredentials = async ({profileImg, headerImg}) => {
  const updateCredentialsUrl = "https://mastodon.social/api/v1/accounts/update_credentials";
  await fetch(updateCredentialsUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.mastodonaccesstoken}`,
    },
    body: JSON.stringify({
      avatar: profileImg,
      header: headerImg,
    }),
  });
};

const postToMastodon = async ({tweetStr, profileImg, headerImg}) => {
  await Promise.all([
    updateStatus({tweetStr}),
    updateCredentials({profileImg, headerImg}),
  ]);
};

module.exports = postToMastodon;
