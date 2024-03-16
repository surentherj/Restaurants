// IMPORT PACKAGES
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels, ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      display: false,
      formatter: function (value, context) {
        if (value === 0 || Array.isArray(value)) {
          return "";
        }
        const datapoint = context.chart.data.datasets[0].data;
        function totalsum(x, y) {
          if (Array.isArray(y)) {
            return x;
          }
          return x + y;
        }
        const totalvalue = datapoint.reduce(totalsum, 0);
        const percent = Math.round((value / totalvalue) * 100);
        const display = `${percent}%`;
        return display;
      },
      labels: {
        title: {
          font: {
            weight: "bold",
          },
        },
        value: {
          color: "black",
        },
      },
    },
  },
};

export function PieChart({ labels, datasets, type }) {
  const data = {
    labels: labels,
    datasets: [
      {
        // label: "# of Votes",
        data: datasets,
        backgroundColor: [
          "#118AB2",
          "#FFD166",
          "#EF476F",
          "#F7A1B5",
          "#06D6A0",
          "#3E5772",
          "#B36231",
          "#C49A2A",
          "#9B6C6E",
          "#87566C",
          "#E1A700",
          "#964E35",
          "#B94269",
          "#6C8061",
          "#AA6639",
          "#587C3B",
          "#945F90",
          "#7182E1",
          "#9F9B8E",
          "#A4703D",
          "#D98C7E",
          "#5E8A6B",
          "#E78345",
          "#C26772",
          "#9A6B9A",
          "#5A6F80",
          "#9E975D",
          "#E6789C",
          "#8D6F57",
          "#C4576D",
          "#A16536",
          "#536571",
          "#C7814A",
          "#6A8B8E",
          "#D25978",
        ],
        borderColor: [
          "#118AB2",
          "#FFD166",
          "#EF476F",
          "#F7A1B5",
          "#06D6A0",
          "#3E5772",
          "#B36231",
          "#C49A2A",
          "#9B6C6E",
          "#87566C",
          "#E1A700",
          "#964E35",
          "#B94269",
          "#6C8061",
          "#AA6639",
          "#587C3B",
          "#945F90",
          "#7182E1",
          "#9F9B8E",
          "#A4703D",
          "#D98C7E",
          "#5E8A6B",
          "#E78345",
          "#C26772",
          "#9A6B9A",
          "#5A6F80",
          "#9E975D",
          "#E6789C",
          "#8D6F57",
          "#C4576D",
          "#A16536",
          "#536571",
          "#C7814A",
          "#6A8B8E",
          "#D25978",
        ],
        borderWidth: 1,
      },
    ],
  };

  return type === "Donut" ? (
    <Doughnut options={options} data={data} />
  ) : (
    <Pie options={options} data={data} />
  );
}
