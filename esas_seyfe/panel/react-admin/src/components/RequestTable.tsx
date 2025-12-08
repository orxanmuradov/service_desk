import React from 'react';
import type { Request } from '../types';

import styles from './RequestTable.module.css';

interface Props {
    requests: Request[];
}

const RequestTable: React.FC<Props> = ({ requests }) => {
    return (
        <div className="p-3 bg-white shadow-sm rounded">
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Sorğu Yazarı</th>
                            <th scope="col">Şirkət Adı</th>
                            <th scope="col">Yazılma Tarixi</th>
                            <th scope="col">İcra Edən</th>
                            <th scope="col">İcra Tarihi</th>
                            <th scope="col">Məlumat</th>
                            <th scope="col" className={styles.notesColumn}>Qeydlər</th>
                            <th scope="col">Şöbə</th>
                            <th scope="col">Vəziyyət</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req.id}>
                                <th scope="row">{req.id}</th>
                                <td>{req.sorguYazan}</td>
                                <td>{req.company || '-'}</td>
                                <td>{req.yazilmaTarihi}</td>
                                <td>{req.icraEden || '-'}</td>
                                <td>{req.icraTarixi || '-'}</td>
                                <td>{req.description || '-'}</td>
                                <td className={styles.notesColumn}>{req.notes || '-'}</td>
                                <td>{req.sobe || '-'}</td>
                                <td>
                                    <span className={`badge ${req.vezziyyet === "İcra Olundu" ? 'bg-success' :
                                        req.vezziyyet === "İcra Olunmayıb" ? 'bg-danger' :
                                            'bg-warning text-dark'
                                        }`}>
                                        {req.vezziyyet}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan={10} className="text-center text-muted">Axtarışınıza uyğun sorğu tapılmadı.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestTable;
