import React from 'react';
import { useData } from '../context/DataContext';
import ChartsSection from '../components/Charts/ChartsSection';
import RequestTable from '../components/RequestTable';
import StatCard from '../components/StatCard';
// DataContext import
const Dashboard: React.FC = () => {
    const { allRequests, searchQuery } = useData();

    // Filter requests based on search query
    const filteredRequests = allRequests.filter(req =>
        !searchQuery ||
        (req.sorguYazan && req.sorguYazan.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (req.company && req.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (req.description && req.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const totalRequests = filteredRequests.length;
    const completedRequests = filteredRequests.filter(req => req.vezziyyet === "İcra Olundu").length;
    const overdueRequests = filteredRequests.filter(req => req.vezziyyet === "Gecikib").length;
    const pendingRequests = filteredRequests.filter(req => req.vezziyyet === "İcra Olunmayıb").length;

    return (
        <div>
            <div className="row g-3 mt-0 mb-2">
                <StatCard
                    title="Ümumi Sorğu"
                    value={totalRequests}
                    icon="fa-tasks"
                />
                <StatCard
                    title="İcra Olunub"
                    value={completedRequests}
                    icon="fa-check-circle"
                    color="text-success"
                />
                <StatCard
                    title="Geciken sorgular"
                    value={overdueRequests}
                    icon="fa-exclamation-triangle"
                    color="text-warning"
                />
                <StatCard
                    title="İcra Olunmayıb"
                    value={pendingRequests}
                    icon="fa-times-circle"
                    color="text-danger"
                />
            </div>

            <div className="row my-4">
                <div className="col-12">
                    <h3 className="fs-4 mb-3">Sorğuların Statistikası</h3>
                </div>
            </div>

            <ChartsSection requests={filteredRequests} />

            <div className="row my-4">
                <div className="col-12">
                    <h3 className="fs-4 mb-3">Son Sorğular</h3>
                </div>
                <div className="col-12">
                    <RequestTable requests={filteredRequests} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
