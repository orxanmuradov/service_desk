import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { Request } from '../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    requests: Request[];
}

const DepartmentPieChart: React.FC<Props> = ({ requests }) => {
    const departmentCounts: { [key: string]: number } = {};
    requests.forEach(req => {
        if (req.sobe) {
            departmentCounts[req.sobe] = (departmentCounts[req.sobe] || 0) + 1;
        }
    });

    const data = {
        labels: Object.keys(departmentCounts),
        datasets: [
            {
                label: '# of Requests',
                data: Object.values(departmentCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={data} />;
};

export default DepartmentPieChart;
