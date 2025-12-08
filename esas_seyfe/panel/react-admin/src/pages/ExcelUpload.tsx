import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const ExcelUpload: React.FC = () => {
    const { setAllRequests } = useData();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const fileName = file.name;
        const fileExtension = fileName.split('.').pop()?.toLowerCase();

        if (fileExtension !== 'xls' && fileExtension !== 'xlsx') {
            setError('Yanlış fayl formatı. Yalnız .xlsx və ya .xls faylları qəbul olunur.');
            setSuccess(null);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const mappedRequests = json.map((row: any) => ({
                    id: row.ID || Date.now(),
                    sorguYazan: row['Sorğu Yazarı'],
                    company: row['Şirkət Adı'],
                    yazilmaTarihi: row['Yazılma Tarixi'],
                    icraEden: row['İcra Edən'],
                    icraTarixi: row['İcra Tarihi'],
                    description: row['Məlumat'],
                    notes: row['Qeydlər'],
                    sobe: row['Şöbə'],
                    vezziyyet: row['Vəziyyət'],
                    icraGun: null
                }));

                setAllRequests(mappedRequests);
                setError(null);
                setSuccess(`"${fileName}" faylı uğurla oxundu və məlumatlar yükləndi. Dashboarda yönləndirilirsiniz...`);

                setTimeout(() => {
                    navigate('/');
                }, 1500);

            } catch (err) {
                console.error("Excel processing error:", err);
                setError('Faylı oxuyarkən xəta baş verdi. Zəhmət olmasa faylın formatını yoxlayın.');
                setSuccess(null);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="container-fluid px-4">
            <div className="row justify-content-center mt-4">
                <div className="col-12">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white border-bottom-0 py-3">
                            <h4 className="card-title mb-0 text-primary fw-bold"><i className="fas fa-file-excel me-2"></i>Excel Faylı Yüklə</h4>
                        </div>
                        <div className="card-body p-4">
                            <div className="mb-4 text-center p-5 border border-2 border-dashed rounded-3 bg-light text-muted">
                                <i className="fas fa-cloud-upload-alt fa-3x mb-3 text-primary"></i>
                                <label htmlFor="excelFile" className="form-label fs-5 d-block cursor-pointer">
                                    Excel faylını buraya çəkin və ya seçmək üçün klikləyin
                                </label>
                                <input
                                    className="form-control d-none"
                                    type="file"
                                    id="excelFile"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileUpload}
                                />
                                <button className="btn btn-primary mt-3" onClick={() => document.getElementById('excelFile')?.click()}>
                                    Fayl Seç
                                </button>
                                <p className="small mt-2 mb-0">.xlsx və ya .xls formatında</p>
                            </div>

                            {error && (
                                <div className="alert alert-danger shadow-sm border-0" role="alert">
                                    <i className="fas fa-exclamation-circle me-2"></i>{error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success shadow-sm border-0" role="alert">
                                    <i className="fas fa-check-circle me-2"></i>{success}
                                </div>
                            )}

                            <div className="alert alert-info mt-4 border-0 shadow-sm bg-light text-dark">
                                <h5 className="text-primary"><i className="fas fa-info-circle me-2"></i>Tələb olunan sütunlar</h5>
                                <p className="mb-2">Yüklənən Excel faylında aşağıdakı başlıqların olduğundan əmin olun:</p>
                                <div className="d-flex flex-wrap gap-2">
                                    {['ID', 'Sorğu Yazarı', 'Şirkət Adı', 'Yazılma Tarixi', 'İcra Edən', 'İcra Tarihi', 'Məlumat', 'Qeydlər', 'Şöbə', 'Vəziyyət'].map(col => (
                                        <span key={col} className="badge bg-secondary">{col}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExcelUpload;
