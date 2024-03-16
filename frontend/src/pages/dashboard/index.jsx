import { useDispatch, useSelector } from "react-redux";
import ChartContainer from "../../components/charts/chartContainer";
import BarChart from "../../components/charts/recharts/Bar";
import { PieChart } from "../../components/charts/recharts/Pie";
import { getDahboardData } from "../../redux/actions/landingPage";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDahboardData());
  }, []);

  const { dashboard } = useSelector((state) => ({
    dashboard: state?.landingPage?.dashboard || {},
  }));

  const currentHour = new Date().getHours();
  return (
    <div className="content-wrapper">
      <div className="container-fluid" id="homePageHeader">
        <div className="row mb-two-s align-self-stretch">
          <h2 className="font-r ml-one-s font-medium grey1">
            {currentHour >= 5 && currentHour < 12
              ? "Good Morning"
              : currentHour >= 12 && currentHour < 18
              ? "Good Afternoon"
              : "Good Evening"}
            , {localStorage?.name}
          </h2>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <h4>Veg Vs Non-Veg Count</h4>
              <ChartContainer
                pie={true}
                chart={
                  <PieChart
                    labels={dashboard?.pieChart?.labels || []}
                    datasets={dashboard?.pieChart?.datasets || []}
                    type={"Pie"}
                  />
                }
              />
            </div>
          </div>
        </div>
        <div className="row mt-two-s">
          <div className="col-12">
            <div className="card">
              <h4>Ratings On Veg/Non-Veg Restaurants</h4>
              <ChartContainer
                chart={
                  <BarChart
                    stack={false}
                    labels={dashboard?.barChart?.labels || []}
                    datasets={dashboard?.barChart?.datasets || []}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
