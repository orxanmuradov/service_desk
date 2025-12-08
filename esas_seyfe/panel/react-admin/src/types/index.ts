export interface Request {
    id: number;
    sorguYazan: string;
    company: string | null;
    yazilmaTarihi: string;
    icraEden: string | null;
    icraTarixi: string | null;
    vezziyyet: "İcra Olundu" | "İcra Olunmayıb" | "Gecikib";
    sobe: string | null;
    icraGun: number | null;
    description: string | null;
    notes: string | null;
}

export interface User {
    id: number;
    username: string;
    password?: string;
    roles: string[];
}

export type Department = "Sistem" | "Şəbəkə" | "Help Desk" | "Infosec" | "ERP" | "Developer" | "Database" | "All";
