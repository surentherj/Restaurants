// IMPORT PACKAGES
import React from "react";

// IMPORT COMPONENTS
import SpinnerOverlay from "../overlays";

const ChartContainer = (props) => {
  const {  chart, loading, pie } = props;

  return (
      <div
        className={`card-body chart-body react-charts-card pie-chart
         ${pie? "":""}`}
      >
        {loading ? (
          <SpinnerOverlay parent="content" loadingText="Loading..." />
        ) : (
          <>{chart}</>
        )}
      </div>
  );
};

export default ChartContainer;
