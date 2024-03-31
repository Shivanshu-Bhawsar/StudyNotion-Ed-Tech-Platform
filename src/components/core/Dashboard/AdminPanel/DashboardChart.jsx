import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const DashboardChart = ({ categories, currentChart }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const getRandomColors = (num) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      colors.push(
        `rgba(${Math.floor(Math.random() * 255)}, 
        ${Math.floor(Math.random() * 255)}, 
        ${Math.floor(Math.random() * 255)})`
      );
    }
    return colors;
  };

  const StudentsData = {
    labels: categories?.map((category) => category?.name),
    datasets: [
      {
        label: "# of Students",
        data: categories?.map((category) => category?.totalStudents),
        backgroundColor: getRandomColors(categories?.length),
        borderColor: getRandomColors(),
        borderWidth: 1,
      },
    ],
  };

  const RevenueData = {
    labels: categories?.map((category) => category?.name),
    datasets: [
      {
        label: "# of Rs",
        data: categories?.map((category) => category?.totalRevenue),
        backgroundColor: getRandomColors(categories?.length),
        borderColor: getRandomColors(),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
    aspectRatio: 2,
  }

  return (
    <div className="mt-8">
      <Pie 
        data={currentChart === "students" ? StudentsData : RevenueData}
        options={options}
      />
    </div>
  );
};

export default DashboardChart;
