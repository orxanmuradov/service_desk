// --- AuthService.js ---
const API_CONFIG = {
    baseUrl: "http://10.160.0.83:8080", // Backend URL
    endpoints: {
        login: "/api/auth/login",
        tickets: "/api/tickets",
        dashboard: "/api/dashboard"
    }
};

const AuthService = {
    // 1. Login Funksiyası
    async login(username, password) {
        try {
            const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.login}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            console.log(response.status);

            if (!response.ok) throw new Error("Giriş uğursuz oldu! Şifrəni yoxlayın.");

            const data = await response.json();

            console.log(data);
            
            // Tokeni yadda saxla
            if (data.token) {
                localStorage.setItem("token", data.token);
                return true;
            }
            return false;
        } catch (error) {
            alert(error.message);
            return false;
        }
    },

    // 2. Çıxış (Logout)
    logout() {
        localStorage.removeItem("jwt_token");
        window.location.href = "login.html"; // Çıxış edəndə login səhifəsinə atır
    },

    // 3. İstifadəçi daxil olubmu?
    isAuthenticated() {
        const token = localStorage.getItem("jwt_token");
        // Burda gələcəkdə tokenin vaxtının bitib-bitmədiyini də yoxlaya bilərsən
        return !!token;
    },

    // 4. API Sorğuları üçün Header (Token daxil)
    getAuthHeader() {
        const token = localStorage.getItem("token");
        return {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }
};