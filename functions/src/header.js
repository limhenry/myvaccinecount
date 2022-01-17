const {CanvasRenderService} = require("chartjs-node-canvas");
const chartDataLabelsPlugin = require("chartjs-plugin-datalabels");

const getConfig = (data, width, height) => {
  return {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [{
        id: "first",
        type: "bar",
        label: "At least 1 dose",
        data: data.first,
        backgroundColor: "#53b544",
        borderColor: "#53b544",
        datalabels: {
          align: "start",
        },
      }, {
        id: "second",
        type: "bar",
        label: "2 Doses   ",
        data: data.second,
        backgroundColor: "#2e2366",
        borderColor: "#2e2366",
        datalabels: {
          align: "start",
        },
      }, {
        type: "bar",
        label: "3 Doses   ",
        data: data.booster,
        backgroundColor: "#326e55",
        borderColor: "#326e55",
        datalabels: {
          align: "start",
        },
      }, {
        id: "sum",
        type: "bar",
        label: false,
        data: new Array(14).fill(1),
        backgroundColor: "transparent",
        borderColor: "transparent",
        datalabels: {
          align: "top",
          color: "#2e2366",
          backgroundColor: "rgba(255,255,255,0.8)",
          display: true,
        },
      }],
    },
    options: {
      layout: {
        padding: {
          top: 10,
        },
      },
      title: {
        display: true,
        text: "MALAYSIA'S DAILY COVID-19 VACCINATION RATE",
        fontColor: "#2e2366",
        fontSize: 34,
        padding: -10,
      },
      legend: {
        reverse: true,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          fontColor: "#2e2366",
          fontSize: 24,
          fontStyle: 600,
          filter: (item) => item.text,
        },
      },
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: "#2e2366",
            fontSize: 19,
            fontStyle: 700,
            padding: -6,
          },
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            fontColor: "#2e2366",
            fontSize: 19,
            fontStyle: 700,
            callback: (value) => {
              const nf = new Intl.NumberFormat();
              return nf.format(value);
            },
          },
        }],
      },
      plugins: {
        datalabels: {
          display: "auto",
          color: "white",
          font: {
            size: 19.5,
            weight: "bold",
          },
          formatter: (value, e) => {
            if (e.dataset.id === "first" || e.dataset.id === "second") {
              return "";
            }
            if (e.dataset.id === "sum") {
              value = data.sum[e.dataIndex];
            }
            const nf = new Intl.NumberFormat();
            return nf.format(value);
          },
        },
      },
    },
    plugins: [{
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
      },
    }],
  };
};

const getChartData = (data) => {
  const results = {
    first: [],
    second: [],
    booster: [],
    sum: [],
    labels: [],
  };

  for (let i = 0; i < data.length; i++) {
    const dateOptions = {
      timeZone: "Asia/Kuala_Lumpur",
      month: "short",
      day: "numeric",
    };
    const e = data[i];
    results.first[i] = e.daily_partial;
    results.second[i] = e.daily_full;
    results.booster[i] = e.daily_booster;
    results.sum[i] = e.daily_partial + e.daily_full + e.daily_booster;
    results.labels[i] = new Date(data[i].date).toLocaleDateString("en", dateOptions);
  }

  return results;
};

const render = async (data) => {
  const chartData = getChartData(data);

  const width = 1500;
  const height = 500;
  const chartJSNodeCanvas = new CanvasRenderService(
      width,
      height,
      (ChartJS) => {
        ChartJS.plugins.register(chartDataLabelsPlugin);
      },
  );
  const config = getConfig(chartData, width, height);
  const img = await chartJSNodeCanvas.renderToDataURL(config);
  return img;
};

module.exports = render;
