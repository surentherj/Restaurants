import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, Legend, PointElement, LinearScale, Title, Tooltip);

const LineChart = (props) => {
  // RENDER GRAPH AFTER LEGEND ELEMENT LOAD
  const dataset = props.inputData;
  // const clickListener = props.clickListener;
  // OPTIONS CONFIG
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        fullWidth: true,
        align: "center",
        labels: {
          fontColor: "#333333",
          fontFamily: "Heebo",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    responsive: true,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
          offset: false,
        },
      },
      y: {
        grid: {
          drawOnChartArea: true,
        },
        ticks: {
          precision: 0,
          // stepSize: 25,
          //   callback: function (value, index, values) {
          //     return value + "%";
          //   },
        },
      },
    },
    // onClick: function (c, i) {
    //   // Finds clicked Bar
    //   if (i.length > 0) {
    //     // let ele = i[0];
    //     // clickListener && clickListener(dataset.key[ele.index]);
    //   }
    // },
  };

  const renderGraph = () => {
    return <Line data={dataset} options={props.options || options} />;
  };

  return <>{dataset ? renderGraph() : <></>}</>;
};

export default LineChart;