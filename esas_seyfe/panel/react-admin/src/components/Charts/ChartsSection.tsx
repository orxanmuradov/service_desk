import React from 'react';
import type { Request } from '../../types';
import DepartmentPieChart from './DepartmentPieChart';
import StatusDoughnutChart from './StatusDoughnutChart';
import TopUsersBarChart from './TopUsersBarChart';

interface Props {
    requests: Request[];
}

const ChartsSection: React.FC<Props> = ({ requests }) => {
    return (
        <div className="row mb-4 g-3">
            <div className="col-lg-4 col-md-6">
                <div className="p-3 bg-white shadow-sm rounded chart-container">
                    <h6 className="text-center text-muted">Şöbələrə görə paylanma (Pie 2D)</h6>
                    <DepartmentPieChart requests={requests} />
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
                <div className="p-3 bg-white shadow-sm rounded chart-container">
                    <h6 className="text-center text-muted">Vəziyyətlərə görə paylanma (Doughnut)</h6>
                    <StatusDoughnutChart requests={requests} />
                </div>
            </div>

            <div className="col-lg-4 col-md-12">
                <div className="p-3 bg-white shadow-sm rounded chart-container">
                    <h6 className="text-center text-muted">Ən çox sorğu yazanlar (Bar)</h6>
                    <TopUsersBarChart requests={requests} />
                </div>
            </div>
        </div>
    );
};

export default ChartsSection;
