// IMPORT PACKAGES
import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

const StackedBar = ({labels,datasets}) => {
  // RENDER GRAPH AFTER LEGEND ELEMENT LOAD
  // OPTIONS CONFIG
  const options = {
    plugins: {
      title: {
        display: true,
      },
      legend: {
        position: 'bottom'
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }
  const data = {
    labels,
    datasets,
  };
  
  return(<>
  {
     labels.length?
     <Bar 
     height={"auto"}
      options={options} data={data} /> 
    :<></>
   }
  </>) 
};

export default StackedBar;
