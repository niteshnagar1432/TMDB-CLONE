import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ score }) => {
  const getSegmentData = (score) => {
    const segmentData = [0, 0, 0, 0];
    
    if (score >= 0 && score <= 24) {
      segmentData[0] = score;
    } else if (score >= 25 && score <= 49) {
      segmentData[1] = score - 25;
      segmentData[0] = 25;
    } else if (score >= 50 && score <= 74) {
      segmentData[2] = score - 50;
      segmentData[1] = 25;
      segmentData[0] = 25;
    } else if (score >= 75 && score <= 100) {
      segmentData[3] = score - 75;
      segmentData[2] = 25;
      segmentData[1] = 25;
      segmentData[0] = 25;
    }
    
    return segmentData;
  };

  const scoreSegments = getSegmentData(score);

  const data = {
    labels: ['0-24', '25-49', '50-74', '75-100'],
    datasets: [
      {
        data: scoreSegments,
        backgroundColor: ['red', 'blue', 'green', 'orange'],
      },
    ],
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
