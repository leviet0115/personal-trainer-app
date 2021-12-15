import { useEffect, useState } from "react";
import { fetchAll } from "./RestRequest";
import { chain, mapValues, sumBy } from "lodash";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Legend,
  Tooltip,
} from "recharts";

const Statistics = () => {
  const [data, setdata] = useState([]);

  //fetch and computing data
  useEffect(() => {
    fetchAll("trainings").then((data) => {
      let groupByActivity = chain(data.content).groupBy("activity").value();
      let sumByDuration = mapValues(groupByActivity, (activity) =>
        sumBy(activity, (act) => act.duration)
      );
      let activities = Object.keys(sumByDuration);
      let duration = Object.values(sumByDuration);
      setdata(
        activities.map((activity, index) => ({
          label: activity,
          value: duration[index],
        }))
      );
    });
  }, []);

  //render bar chart
  return (
    <div
      style={{
        justifyContent: "center",
      }}
    >
      <BarChart
        width={1500}
        height={500}
        data={data}
        margin={{ top: 50, right: 80, bottom: 50, left: 180 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis dataKey="value" />
        <Legend align="center" />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" name="Total booked minutes" />
      </BarChart>
      <h2>Training reservation by activity</h2>
    </div>
  );
};

export default Statistics;
