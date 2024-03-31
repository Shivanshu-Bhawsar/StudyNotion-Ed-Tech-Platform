import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const DashboardChart = ({ courses, currentChart }) => {
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
    labels: courses?.map((course) => course?.courseName),
    datasets: [
      {
        label: "# of Students",
        data: courses?.map((course) => course?.totalStudents),
        backgroundColor: getRandomColors(courses?.length),
        borderColor: getRandomColors(),
        borderWidth: 1,
      },
    ],
  };

  const RevenueData = {
    labels: courses?.map((course) => course?.courseName),
    datasets: [
      {
        label: "# of Rs",
        data: courses?.map((course) => course?.totalRevenue),
        backgroundColor: getRandomColors(courses?.length),
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
