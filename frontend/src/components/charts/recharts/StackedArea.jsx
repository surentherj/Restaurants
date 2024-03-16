// IMPORT PACKAGES
import React from "react";
import { Bar, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const StackedArea = ({ labels, datasets, stack }) => {
  // RENDER GRAPH AFTER LEGEND ELEMENT LOAD
  // OPTIONS CONFIG
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        mode: "index",
      },
      datalabels: {
        formatter: function (value, context) {
          return value === 0 || context.dataset.label === "Total" ? "" : value;
        },
        align: "top",
        display: true,
        labels: {
          filter: function (item, chart) {
            return !item.text.includes("Total");
          },
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
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {},
      y: {
        stacked: stack || false,
      },
    },
  };
  const data = {
    labels,
    datasets,
  };

  return (
    <>
      {labels.length ? (
        <Line height={"auto"} options={options} data={data} />
      ) : (
        <></>
      )}
    </>
  );
};

export default StackedArea;
