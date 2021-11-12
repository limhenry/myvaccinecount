const path = require("path");
const {createCanvas, loadImage} = require("canvas");

const render = async (data, population) => {
  const img = await loadImage(path.resolve(__dirname, "../assets/icon.png"));

  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext("2d");

  const vax = getProfileData(data, population);

  draw(ctx, img, vax);

  return canvas.toDataURL();
};

const getProfileData = (data, population) => {
  return {
    first: data.cumul_partial / population * 100,
    second: data.cumul_full / population * 100,
    booster: data.cumul_booster / population * 100,
  };
};

const draw = (ctx, img, data) => {
  const width = 28;
  const radius = 200 - (width / 2);
  const angle = Math.PI * 1.5;
  const offset = ((width / 2) / (Math.PI * 400) * 360) * (Math.PI / 180);

  ctx.drawImage(img, 0, 0, 400, 400);

  drawProgressArc(ctx, 100, radius, angle, 0, width, "#2c41a4");
  drawProgressArc(ctx, data.first, radius, angle, offset, width, "#c0f4b8");
  drawProgressArc(ctx, data.second, radius, angle, offset, width, "#34cf1c");
  drawProgressArc(ctx, data.booster, radius, angle, offset, width, "#138402");
};

const drawProgressArc = (ctx, value, radius, angle, offset, width, color) => {
  if (value < 5) return;
  ctx.beginPath();
  ctx.arc(200, 200, radius, angle + offset, (value / 100 * Math.PI * 2) + angle - offset, false);
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
};

module.exports = render;
