const FormData = require("form-data");
const fetch = require("node-fetch");

const sendMessage = async (msg, chatId, token) => {
  try {
    const form = new FormData();
    form.append("chat_id", chatId);
    form.append("text", msg);
    await fetch(`https://api.telegram.org/${token}/sendMessage`, {
      method: "POST",
      body: form,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendMessage;
