import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import type { Request } from '../../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
    requests: Request[];
}

const TopUsersBarChart: React.FC<Props> = ({ requests }) => {
    const userCounts: { [key: string]: number } = {};
    requests.forEach(req => {
        if (req.sorguYazan) {
            userCounts[req.sorguYazan] = (userCounts[req.sorguYazan] || 0) + 1;
        }
    });

    // Sort by count descending and take top 5
    const sortedUsers = Object.entries(userCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    const data = {
        labels: sortedUsers.map(([user]) => user),
        datasets: [
            {
                label: 'Sorgu Sayı',
                data: sortedUsers.map(([, count]) => count),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default TopUsersBarChart;
