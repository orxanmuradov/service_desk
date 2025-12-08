import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { Request } from '../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    requests: Request[];
}

const StatusDoughnutChart: React.FC<Props> = ({ requests }) => {
    const statusCounts: { [key: string]: number } = {};
    requests.forEach(req => {
        statusCounts[req.vezziyyet] = (statusCounts[req.vezziyyet] || 0) + 1;
    });

    const data = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                label: '# of Requests',
                data: Object.values(statusCounts),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Green for Success
                    'rgba(255, 99, 132, 0.2)', // Red for Pending
                    'rgba(255, 206, 86, 0.2)', // Yellow for Overdue
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={data} />;
};

export default StatusDoughnutChart;
