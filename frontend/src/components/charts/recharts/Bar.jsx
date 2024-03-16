import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ labels, datasets }) {
  const options = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
      },
      datalabels: {
        formatter: function (value, context) {
          return value === 0 ? "" : value;
        },
        align: "top",
        display: true,
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

  const data = {
    labels,
    datasets,
  };

  return (
    <>
      {labels.length ? (
        <Bar
          height={labels.length ? labels?.length * 80 : "auto"}
          options={options}
          data={data}
        />
      ) : (
        <></>
      )}
    </>
  );
}
