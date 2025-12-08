import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { User, Request } from '../types';

// Add autoTable to jsPDF type
declare module 'jspdf' {
    interface jsPDF {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        autoTable: (options: any) => jsPDF;
    }
}

export const exportToExcel = (data: (string | number)[][], headers: string[], filename: string) => {
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hesabat");
    XLSX.writeFile(workbook, filename);
};

export const exportToPDF = (data: (string | number)[][], headers: string[], filename: string) => {
    const doc = new jsPDF();
    doc.autoTable({
        head: [headers],
        body: data,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2 },
    });
    doc.save(filename);
};

export const prepareUserData = (users: User[]) => {
    return {
        headers: ['ID', 'İstifadəçi Adı', 'Parol', 'Rollar'],
        data: users.map(user => [user.id, user.username, '**********', user.roles.join(', ')])
    };
};

export const prepareRequestData = (requests: Request[]) => {
    return {
        headers: ['#', 'Sorğu Yazarı', 'Şirkət Adı', 'Yazılma Tarixi', 'İcra Edən', 'İcra Tarixi', 'Məlumat', 'Qeydlər', 'Şöbə', 'Vəziyyət'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: requests.map(req => [
            req.id,
            req.sorguYazan || '',
            req.company || '',
            req.yazilmaTarihi || '',
            req.icraEden || '',
            req.icraTarixi || '',
            req.description || '',
            req.notes || '',
            req.sobe || '',
            req.vezziyyet
        ])
    };
};
