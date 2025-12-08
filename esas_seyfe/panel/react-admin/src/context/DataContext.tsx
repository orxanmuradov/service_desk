import React, { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Request, User } from '../types';

interface DataContextType {
    allRequests: Request[];
    setAllRequests: React.Dispatch<React.SetStateAction<Request[]>>;
    allUsers: User[];
    setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
    currentUser: User | null;
    login: (user: User) => void;
    logout: () => void;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_REQUESTS: Request[] = [
    {
        id: 1,
        sorguYazan: "Orxan Muradov",
        company: "FMG",
        yazilmaTarihi: "12.04.2025",
        icraEden: "Sərxan Hüseynli",
        icraTarixi: "16.04.2025",
        vezziyyet: "İcra Olundu",
        sobe: "Sistem",
        icraGun: 4,
        description: "Şəbəkə bağlantısında problem. İstifadəçi internetə qoşula bilmir.",
        notes: "Problemin kökü server tərəfdəki DNS qeydlərində aşkarlandı və düzəldildi. İstifadəçi məmnun qaldı və artıq internetə tam qoşulur."
    },
    {
        id: 2,
        sorguYazan: "Leyla Əliyeva",
        company: "Azerşəkər",
        yazilmaTarihi: "10.04.2025",
        icraEden: null,
        icraTarixi: null,
        vezziyyet: "İcra Olunmayıb",
        sobe: "Help Desk",
        icraGun: null,
        description: "Kompyuterin donması şikayəti. Proqramlar açılmır.",
        notes: "Texniki baxış üçün göndərilməli. Hələ cavab yoxdur. Ehtiyat hissələri gözlənilir."
    },
    {
        id: 3,
        sorguYazan: "Cavid Həsənov",
        company: "Synergiya",
        yazilmaTarihi: "08.04.2025",
        icraEden: "Nərmin Məmmədova",
        icraTarixi: "20.04.2025",
        vezziyyet: "Gecikib",
        sobe: "Şəbəkə",
        icraGun: 12,
        description: "Wi-Fi bağlantısı tez-tez kəsilir. Zoom zənglərində problem var.",
        notes: "Switch yoxlandı, problem server tərəfdədir. Sistem şöbəsinə yönləndirildi. İcra gözlənilir."
    },
    {
        id: 4,
        sorguYazan: "Günay Əhmədova",
        company: "Dizayn Büro",
        yazilmaTarihi: "15.04.2025",
        icraEden: "Kamran Quliyev",
        icraTarixi: "17.04.2025",
        vezziyyet: "İcra Olundu",
        sobe: "Developer",
        icraGun: 2,
        description: "Veb saytda daxilolma səhvi. İstifadəçilər giriş edə bilmir.",
        notes: "Kodda kiçik bir typo tapıldı və düzəldildi. Yenidən sınaqdan keçirildi, problem həll olundu."
    },
    {
        id: 5,
        sorguYazan: "Rəşad Qurbanov",
        company: "FMG",
        yazilmaTarihi: "18.04.2025",
        icraEden: null,
        icraTarixi: null,
        vezziyyet: "İcra Olunmayıb",
        sobe: "ERP",
        icraGun: null,
        description: "ERP proqramında hesabat xətası. Məlumatlar düzgün gəlmir.",
        notes: "Məlumatlar yoxlanılır, çətin tapılır. Modul daxilində uyğunsuzluq olduğu güman edilir."
    },
    {
        id: 6,
        sorguYazan: "Aynur Xəlilova",
        company: "Azerşəkər",
        yazilmaTarihi: "05.04.2025",
        icraEden: "Sərxan Hüseynli",
        icraTarixi: "15.04.2025",
        vezziyyet: "İcra Olundu",
        sobe: "Sistem",
        icraGun: 10,
        description: "Yeni proqram təminatının (MS Office 365) quraşdırılması.",
        notes: "Quraşdırılma uğurlu oldu, sınaqdan keçirildi. İstifadəçiyə təlimat verildi."
    },
    {
        id: 7,
        sorguYazan: "Əli Vəliyev",
        company: "Dizayn Büro",
        yazilmaTarihi: "20.04.2025",
        icraEden: null,
        icraTarixi: null,
        vezziyyet: "Gecikib",
        sobe: "Help Desk",
        icraGun: null,
        description: "Printer işləmir. Sənədləri çap edə bilmirəm.",
        notes: "Kartric dəyişdirilməlidir, sifariş verilib. Çatdırılma gözlənilir."
    },
    {
        id: 8,
        sorguYazan: "Fidan Həsənova",
        company: "Synergiya",
        yazilmaTarihi: "01.05.2025",
        icraEden: "Elvin Qasımov",
        icraTarixi: "03.05.2025",
        vezziyyet: "İcra Olundu",
        sobe: "Database",
        icraGun: 2,
        description: "Verilənlər bazasında sürət problemi. Sorğular gec işləyir.",
        notes: "İndeksasiya düzəldildi, performans 30% yaxşılaşdı. Məlumat bazası optimal vəziyyətə gətirildi."
    },
    {
        id: 9,
        sorguYazan: "Samir Kərimov",
        company: "FMG",
        yazilmaTarihi: "25.04.2025",
        icraEden: null,
        icraTarixi: null,
        vezziyyet: "Gecikib",
        sobe: "Database",
        icraGun: null,
        description: "Yedəkləmə (backup) alınmır. Xəta mesajı gəlir.",
        notes: "Diskdə yer yoxdur, yeni yer ayrıldı. Lakin hələ də problem var, araşdırılır."
    },
    {
        id: 10,
        sorguYazan: "Orxan Muradov",
        company: "TechSolutions",
        yazilmaTarihi: "01.05.2025",
        icraEden: "Ayşən Quliyeva",
        icraTarixi: "05.05.2025",
        vezziyyet: "İcra Olundu",
        sobe: "Help Desk",
        icraGun: 4,
        description: "Yeni işçi üçün email hesabı yaradılması.",
        notes: "Hesab uğurla yaradıldı və məlumatlar təqdim edildi."
    },
    {
        id: 11,
        sorguYazan: "Orxan Muradov",
        company: "GlobalNet",
        yazilmaTarihi: "03.05.2025",
        icraEden: null,
        icraTarixi: null,
        vezziyyet: "Gecikib",
        sobe: "Şəbəkə",
        icraGun: null,
        description: "VPN bağlantısında problem. Uzaqdan işləyə bilmirəm.",
        notes: "Şəbəkə komandasına yönləndirildi, araşdırma davam edir."
    },
    {
        id: 12,
        sorguYazan: "Orxan Muradov",
        company: "FMG",
        yazilmaTarihi: "07.05.2025",
        icraEden: "Sərxan Hüseynli",
        icraTarixi: "08.05.2025",
        vezziyyet: "İcra Olundu",
        sobe: "Sistem",
        icraGun: 1,
        description: "Proqram yenilənməsi tələbi.",
        notes: "Yenilənmə uğurla tətbiq edildi."
    },
    {
        id: 13,
        sorguYazan: "Orxan Muradov",
        company: "TechSolutions",
        yazilmaTarihi: "10.05.2025",
        icraEden: null,
        icraTarixi: null,
        vezziyyet: "İcra Olunmayıb",
        sobe: "Database",
        icraGun: null,
        description: "Verilənlər bazasından məlumat çıxarışı tələbi.",
        notes: "Məlumat bazası komandası tərəfindən baxılır."
    },
    {
        id: 14,
        sorguYazan: "Orxan Muradov",
        company: "GlobalNet",
        yazilmaTarihi: "11.05.2025",
        icraEden: "Ayşən Quliyeva",
        icraTarixi: "11.05.2025",
        vezziyyet: "İcra Olundu",
        sobe: "Help Desk",
        icraGun: 0,
        description: "Parol sıfırlanması.",
        notes: "Parol sıfırlandı, istifadəçiyə məlumat verildi."
    },
    {
        id: 15,
        sorguYazan: "Orxan Muradov",
        company: "FMG",
        yazilmaTarihi: "13.05.2025",
        icraEden: null,
        icraTarixi: null,
        vezziyyet: "Gecikib",
        sobe: "Sistem",
        icraGun: null,
        description: "Yeni serverə keçid planlaşdırılması.",
        notes: "Planlaşdırma mərhələsindədir, resurslar gözlənilir."
    },
    {
        id: 16,
        sorguYazan: "Elvin Qasımov",
        company: "Synergiya",
        yazilmaTarihi: "14.05.2025",
        icraEden: "Orxan Muradov",
        icraTarixi: "15.05.2025",
        vezziyyet: "İcra Olundu",
        sobe: "Database",
        icraGun: 1,
        description: "SQL sorğusunda optimizasiya tələbi.",
        notes: "Sorğu optimizasiya edildi, performans yaxşılaşdı."
    },
    {
        id: 17,
        sorguYazan: "Samir Kərimov",
        company: "GlobalNet",
        yazilmaTarihi: "21.05.2025",
        icraEden: "Nərmin Məmmədova",
        icraTarixi: "23.05.2025",
        vezziyyet: "İcra Olundu",
        sobe: "Infosec",
        icraGun: 2,
        description: "Firewall qaydalarının yenilənməsi.",
        notes: "Yeni təhlükəsizlik qaydaları tətbiq edildi və sınaqdan keçirildi."
    },
    {
        id: 18,
        sorguYazan: "Aynur Xəlilova",
        company: "TechSolutions",
        yazilmaTarihi: "20.05.2025",
        icraEden: null,
        icraTarixi: null,
        vezziyyet: "Gecikib",
        sobe: "Infosec",
        icraGun: null,
        description: "Zərərli proqram (malware) şübhəsi.",
        notes: "Sistem skan edildi, şübhəli fayllar karantinə alındı. Daha ətraflı araşdırma aparılır."
    }
];

const INITIAL_USERS: User[] = [
    { id: 1, username: "admin", password: "admin123", roles: ["Admin", "Developer"] },
    { id: 2, username: "user1", password: "pass123", roles: ["Help Desk", "Viewer"] },
    { id: 3, username: "editor", password: "editor123", roles: ["Editor"] },
    { id: 4, username: "sysadmin", password: "syspass", roles: ["Admin", "System"] }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allRequests, setAllRequests] = useState<Request[]>(() => {
        const stored = sessionStorage.getItem('allRequests');
        return stored ? JSON.parse(stored) : INITIAL_REQUESTS;
    });

    const [allUsers, setAllUsers] = useState<User[]>(() => {
        const stored = sessionStorage.getItem('allUsers');
        return stored ? JSON.parse(stored) : INITIAL_USERS;
    });

    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const stored = sessionStorage.getItem('currentUser');
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        sessionStorage.setItem('allRequests', JSON.stringify(allRequests));
    }, [allRequests]);

    useEffect(() => {
        sessionStorage.setItem('allUsers', JSON.stringify(allUsers));
    }, [allUsers]);

    useEffect(() => {
        if (currentUser) {
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            sessionStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    const [searchQuery, setSearchQuery] = useState("");

    const login = (user: User) => {
        setCurrentUser(user);
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <DataContext.Provider value={{
            allRequests,
            setAllRequests,
            allUsers,
            setAllUsers,
            currentUser,
            login,
            logout,
            searchQuery,
            setSearchQuery
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
