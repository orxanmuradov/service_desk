
// Əgər istifadəçi daxil olmayıbsa, dərhal login-ə at
if (typeof AuthService !== 'undefined' && !AuthService.isAuthenticated()) {
    window.location.href = "login.html";
}


document.addEventListener('DOMContentLoaded', function() {
    // Dummy Data: Excel faylından gələcək məlumatları simulyasiya edirik
    // Sizin şəklinizə uyğun sıralama: ID, Sorğu Yazarı, Şirkət Adı, Yazılma Tarixi, İcra Edən, İcra Tarihi, Məlumat, Qeydlər, Şöbə, Vəziyyət
    let allRequests = [ 
        {
            id: 1,
            sorguYazan: "Orxan Muradov",
            company: "FMG", 
            yazilmaTarihi: "12.04.2025",
            icraEden: "Sərxan Hüseynli",
            icraTarixi: "16.04.2025",
            vezziyyet: "İcra Olundu", // İcra Olundu, İcra Olunmayıb, Gecikib
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
            icraEden: "",
            icraTarixi: "",
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
            icraEden: "",
            icraTarixi: "",
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
            icraEden: "",
            icraTarixi: "",
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
            icraEden: "",
            icraTarixi: "",
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
            icraEden: "",
            icraTarixi: "",
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
            icraEden: "",
            icraTarixi: "",
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
            icraEden: "",
            icraTarixi: "",
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
            icraEden: "",
            icraTarixi: "",
            vezziyyet: "Gecikib",
            sobe: "Infosec",
            icraGun: null,
            description: "Zərərli proqram (malware) şübhəsi.",
            notes: "Sistem skan edildi, şübhəli fayllar karantinə alındı. Daha ətraflı araşdırma aparılır."
        }
    ];

    let currentDisplayedRequests = [...allRequests]; 

    const storedRequests = sessionStorage.getItem('allRequests');
    if (storedRequests) {
        allRequests = JSON.parse(storedRequests);
        currentDisplayedRequests = allRequests;
    }

    let allUsers = [
        { id: 1, username: "admin", password: "admin123", roles: ["Admin", "Developer"] },
        { id: 2, username: "user1", password: "pass123", roles: ["Help Desk", "Viewer"] },
        { id: 3, username: "editor", password: "editor123", roles: ["Editor"] },
        { id: 4, username: "sysadmin", password: "syspass", roles: ["Admin", "System"] } 
    ];
    const storedUsers = sessionStorage.getItem('allUsers');
    if (storedUsers) {
        allUsers = JSON.parse(storedUsers);
    }
    let nextUserId = allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id)) + 1 : 1;


    // Chart Dəyişənlərinin Təyin Edilməsi
    let departmentPieChartInstance = null;
    let statusDoughnutChartInstance = null;
    let topUsersBarChartInstance = null;


    function updateDashboard(requestsToDisplay) {
        currentDisplayedRequests = requestsToDisplay; 
        
        // Chartları yenilə
        if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/panel/')) {
            renderCharts(requestsToDisplay);
        }

        if (document.getElementById('totalRequests')) { 
            const totalRequestsCount = requestsToDisplay.length;
            const completedRequestsCount = requestsToDisplay.filter(req => req.vezziyyet === "İcra Olundu").length;
            const overdueRequestsCount = requestsToDisplay.filter(req => req.vezziyyet === "Gecikib").length;
            const pendingRequestsCount = requestsToDisplay.filter(req => req.vezziyyet === "İcra Olunmayıb").length;

            document.getElementById('totalRequests').textContent = totalRequestsCount;
            document.getElementById('completedRequests').textContent = completedRequestsCount;
            document.getElementById('overdueRequests').textContent = overdueRequestsCount;
            document.getElementById('pendingRequests').textContent = pendingRequestsCount;
        }

//         const tableBody = document.querySelector('#requestTable tbody');
//         if (tableBody) { 
//             tableBody.innerHTML = ''; 
//             if (requestsToDisplay.length === 0) {
//                 const emptyRow = tableBody.insertRow();
//                 emptyRow.innerHTML = `<td colspan="10" class="text-center text-muted">Axtarışınıza uyğun sorğu tapılmadı.</td>`;
//             } else {
//                 requestsToDisplay.forEach((req, index) => {
//                     const row = tableBody.insertRow();
//                     let badgeClass = '';
//                     if (req.vezziyyet === "İcra Olundu") {
//                         badgeClass = 'bg-success';
//                     } else if (req.vezziyyet === "İcra Olunmayıb") {
//                         badgeClass = 'bg-danger';
//                     } else if (req.vezziyyet === "Gecikib") {
//                         badgeClass = 'bg-warning text-dark';
//                     }
//                     // BURADAKİ SIRA HTML BAŞLIQLARI İLƏ TAM UYĞUNLAŞDIRILIR
//                     row.innerHTML = `
//                         <th scope="row">${req.id}</th>                                    <td>${req.sorguYazan}</td>                                        <td>${req.company || '-'}</td>                                    <td>${req.yazilmaTarihi}</td>                                     <td>${req.icraEden || '-'}</td>                                   <td>${req.icraTarixi || '-'}</td>                                 <td>${req.description || '-'}</td>                                <td class="notes-column">${req.notes || '-'}</td>                               <td>${req.sobe || '-'}</td>                                       <td><span class="badge ${badgeClass}">${req.vezziyyet}</span></td>                     `;
//                 });
//             }
//         }
//     }



   const tableBody = document.querySelector('#requestTable tbody');
        if (tableBody) { 
            tableBody.innerHTML = ''; 
            if (requestsToDisplay.length === 0) {
                const emptyRow = tableBody.insertRow();
                emptyRow.innerHTML = `<td colspan="10" class="text-center text-muted">Axtarışınıza uyğun sorğu tapılmadı.</td>`;
            } else {
                requestsToDisplay.forEach((req, index) => {
                    const row = tableBody.insertRow();
                    let badgeClass = '';
                    if (req.vezziyyet === "İcra Olundu") {
                        badgeClass = 'bg-success';
                    } else if (req.vezziyyet === "İcra Olunmayıb") {
                        badgeClass = 'bg-danger';
                    } else if (req.vezziyyet === "Gecikib") {
                        badgeClass = 'bg-warning text-dark';
                    }
                    row.innerHTML = `
                        <th scope="row">${req.id}</th>
                        <td>${req.sorguYazan}</td>
                        <td>${req.company || '-'}</td> 
                        <td>${req.yazilmaTarihi}</td>
                        <td>${req.icraEden || '-'}</td>
                        <td>${req.icraTarixi || '-'}</td>
                        <td>${req.description || '-'}</td> 
                        <td class="notes-column">${req.notes || '-'}</td>       
                        <td>${req.sobe || '-'}</td> 
                        <td><span class="badge ${badgeClass}">${req.vezziyyet}</span></td>
                    `;
                });
            }
        }
    }
    function updateUsersTable() {
        const userTableBody = document.querySelector('#userTable tbody');
        if (!userTableBody) return; 
        currentDisplayedRequests = allUsers; 

        userTableBody.innerHTML = ''; 
        if (allUsers.length === 0) {
            const emptyRow = userTableBody.insertRow();
            emptyRow.innerHTML = `<td colspan="5" class="text-center text-muted">Heç bir istifadəçi tapılmadı.</td>`;
        } else {
            allUsers.forEach(user => {
                const row = userTableBody.insertRow();
                const usernameDisplay = user.roles.includes("Admin") ? 
                                        `<i class="fas fa-crown text-warning me-2"></i> ${user.username}` : 
                                        user.username;
                
                row.innerHTML = `
                    <th scope="row">${user.id}</th>
                    <td>${usernameDisplay}</td>
                    <td>**********</td> 
                    <td>${user.roles.join(', ')}</td>
                    <td>
                        <button class="btn btn-sm btn-info edit-user-btn me-2" data-bs-toggle="modal" data-bs-target="#userModal" data-user-id="${user.id}">
                            <i class="fas fa-edit"></i> Redaktə Et
                        </button>
                        <button class="btn btn-sm btn-danger delete-user-btn" data-user-id="${user.id}">
                            <i class="fas fa-trash-alt"></i> Sil
                        </button>
                    </td>
                `;
            });
        }
        sessionStorage.setItem('allUsers', JSON.stringify(allUsers)); 
        document.querySelectorAll('.edit-user-btn').forEach(button => {
            button.addEventListener('click', function() {
                const userId = parseInt(this.dataset.userId);
                const userToEdit = allUsers.find(user => user.id === userId);
                if (userToEdit) {
                    document.getElementById('userId').value = userToEdit.id;
                    document.getElementById('usernameInput').value = userToEdit.username;
                    document.getElementById('passwordInput').value = ''; 
                    const rolesInput = document.getElementById('rolesInput');
                    Array.from(rolesInput.options).forEach(option => option.selected = false);
                    userToEdit.roles.forEach(role => {
                        const option = Array.from(rolesInput.options).find(opt => opt.value === role);
                        if (option) option.selected = true;
                    });
                    document.getElementById('userModalLabel').textContent = "İstifadəçini Redaktə Et";
                    document.getElementById('passwordInput').removeAttribute('required'); 
                }
            });
        });

        document.querySelectorAll('.delete-user-btn').forEach(button => {
            button.addEventListener('click', function() {
                const userId = parseInt(this.dataset.userId);
                const userToDelete = allUsers.find(u => u.id === userId);
                if (userToDelete && confirm(`"${userToDelete.username}" istifadəçisini silmək istədiyinizə əminsiniz?`)) {
                    allUsers = allUsers.filter(user => user.id !== userId);
                    updateUsersTable(); 
                }
            });
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const usernameError = document.getElementById('usernameError');
        const passwordError = document.getElementById('passwordError');
        const loginMessage = document.getElementById('loginMessage');
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            usernameInput.classList.remove('is-invalid');
            passwordInput.classList.remove('is-invalid');
            usernameError.style.display = 'none';
            passwordError.style.display = 'none';
            loginMessage.classList.add('d-none');
            let isValid = true;
            if (usernameInput.value.trim() === '') {
                usernameInput.classList.add('is-invalid');
                usernameError.style.display = 'block';
                isValid = false;
            }
            if (passwordInput.value.trim() === '') {
                passwordInput.classList.add('is-invalid');
                passwordError.style.display = 'block';
                isValid = false;
            }
            if (isValid) {
                const username = usernameInput.value.trim();
                const password = passwordInput.value.trim();
                const foundUser = allUsers.find(user => user.username === username && user.password === password);
                if (foundUser) { 
                    loginMessage.classList.remove('d-none', 'alert-danger');
                    loginMessage.classList.add('alert-success');
                    loginMessage.textContent = 'Giriş uğurludur! Yönləndirilirsiniz...';
                    setTimeout(() => {
                        window.location.href = 'index.html'; 
                    }, 1500); 
                } else {
                    loginMessage.classList.remove('d-none', 'alert-success');
                    loginMessage.classList.add('alert-danger');
                    loginMessage.textContent = 'İstifadəçi adı və ya parol yanlışdır!';
                }
            }
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');
    const logoutButton = document.getElementById('logoutButton');
    const logoutDropdown = document.getElementById('logoutDropdown');

    if (menuToggle && wrapper) { 
        menuToggle.addEventListener('click', function() {
            wrapper.classList.toggle('toggled');
        });
    }

    function performLogout() {
        if (confirm("Sistemdən çıxmaq istədiyinizə əminsiniz?")) {
            window.location.href = 'login.html'; 
        }
    }
    if (logoutButton) {
        logoutButton.addEventListener('click', performLogout);
    }
    if (logoutDropdown) {
        logoutDropdown.addEventListener('click', performLogout);
    }
    const currentPath = window.location.pathname; 
    const sidebarLinks = document.querySelectorAll('#sidebar-wrapper .list-group-item');
    sidebarLinks.forEach(link => {
        link.classList.remove('active'); 
        const linkHref = link.getAttribute('href');
        if (linkHref) {
            if (linkHref === 'index.html' && (currentPath.endsWith('/panel/') || currentPath.includes('index.html'))) {
                link.classList.add('active');
            } 
            else if (currentPath.includes(linkHref) && linkHref !== 'index.html') {
                link.classList.add('active');
            }
            else if (currentPath.includes('all-requests.html') && linkHref === 'all-requests.html') {
                link.classList.add('active');
            }
            else if (currentPath.includes('completed-requests.html') && linkHref === 'completed-requests.html') {
                link.classList.add('active');
            }
            else if (currentPath.includes('overdue-requests.html') && linkHref === 'overdue-requests.html') {
                link.classList.add('active');
            }
            else if (currentPath.includes('pending-requests.html') && linkHref === 'pending-requests.html') {
                link.classList.add('active');
            }
            if (link.parentElement.classList.contains('collapse') && link.classList.contains('active')) {
                const dropdownToggle = document.querySelector(`[href="#departmentsCollapse"]`);
                if (dropdownToggle) {
                    dropdownToggle.classList.add('active');
                    dropdownToggle.setAttribute('aria-expanded', 'true');
                    document.getElementById('departmentsCollapse').classList.add('show'); 
                }
            }
        }
    });

    const excelUploadForm = document.getElementById('excelUploadForm');
    if (excelUploadForm) { 
        const excelFileInput = document.getElementById('excelFile');
        const uploadMessage = document.getElementById('uploadMessage');
        excelUploadForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            uploadMessage.classList.add('d-none'); 
            uploadMessage.classList.remove('alert-success', 'alert-danger');
            const file = excelFileInput.files[0]; 
            if (!file) {
                uploadMessage.classList.remove('d-none');
                uploadMessage.classList.add('alert-danger');
                uploadMessage.textContent = 'Lütfən, bir fayl seçin.';
                return;
            }
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();
            if (fileExtension === 'xls' || fileExtension === 'xlsx') {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet);
                    const mappedRequests = json.map(row => ({
                        id: row.ID, 
                        sorguYazan: row['Sorğu Yazarı'], 
                        company: row['Şirkət Adı'], 
                        yazilmaTarihi: row['Yazılma Tarixi'],
                        icraEden: row['İcra Edən'],
                        icraTarixi: row['İcra Tarihi'],
                        description: row['Məlumat'],
                        notes: row['Qeydlər'],
                        sobe: row['Şöbə'],
                        vezziyyet: row['Vəziyyət']
                    }));
                    allRequests = mappedRequests; 
                    sessionStorage.setItem('allRequests', JSON.stringify(allRequests)); 
                    uploadMessage.classList.remove('d-none');
                    uploadMessage.classList.add('alert-success');
                    uploadMessage.textContent = `"${fileName}" faylı uğurla oxundu və məlumatlar yükləndi. Dashboarda yönləndirilirsiniz...`;
                    setTimeout(() => {
                        window.location.href = 'index.html'; 
                    }, 1500);
                };
                reader.readAsArrayBuffer(file); 
            } else {
                uploadMessage.classList.remove('d-none');
                uploadMessage.classList.add('alert-danger');
                uploadMessage.textContent = 'Yanlış fayl formatı. Yalnız .xlsx və ya .xls faylları qəbul olunur.';
            }
        });
    }

    function filterDashboardByEmployeeName(searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        let filteredRequests = [];
        let employeeNameForTitle = ""; 
        if (searchTerm.trim() === '') {
            filteredRequests = allRequests;
            employeeNameForTitle = ""; 
        } else {
            filteredRequests = allRequests.filter(req => 
                (req.sorguYazan && req.sorguYazan.toLowerCase().includes(lowerCaseSearchTerm)) ||
                (req.icraEden && req.icraEden.toLowerCase().includes(lowerCaseSearchTerm)) ||
                (req.description && req.description.toLowerCase().includes(lowerCaseSearchTerm)) || 
                (req.company && req.company.toLowerCase().includes(lowerCaseSearchTerm))
            );
            if (filteredRequests.length > 0) {
                const matchedRequest = filteredRequests.find(req => 
                    (req.sorguYazan && req.sorguYazan.toLowerCase() === lowerCaseSearchTerm) ||
                    (req.icraEden && req.icraEden.toLowerCase() === lowerCaseSearchTerm)
                ) || filteredRequests[0]; 
                employeeNameForTitle = matchedRequest.sorguYazan || matchedRequest.icraEden || "";
                if (!employeeNameForTitle.toLowerCase().includes(lowerCaseSearchTerm)) {
                    employeeNameForTitle = `"${searchTerm}"`; 
                }
            } else {
                employeeNameForTitle = `"${searchTerm}"`; 
            }
        }
        const dashboardTitleElement = document.getElementById('dashboardTitle');
        if (dashboardTitleElement) {
            dashboardTitleElement.textContent = employeeNameForTitle ? `Dashboard - ${employeeNameForTitle} üçün` : 'Dashboard';
        }
        updateDashboard(filteredRequests); 
        updateClickableCards(employeeNameForTitle.replace(/"/g, '')); 
    }

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const dashboardTitleElement = document.querySelector('#page-content-wrapper h2'); 
    if (dashboardTitleElement && (currentPath.endsWith('/panel/') || currentPath.includes('index.html'))) {
            dashboardTitleElement.id = 'dashboardTitle'; 
            if (searchInput) {
              searchInput.addEventListener('input', function() {
                filterDashboardByEmployeeName(this.value);
              });
              if (searchButton) {
                searchButton.addEventListener('click', function(event) {
                    event.preventDefault(); 
                    filterDashboardByEmployeeName(searchInput.value);
                });
              }
           }
    }
    
    function updateClickableCards(employeeName = "") {
        const totalCardLink = document.querySelector('.col-md-3 .text-decoration-none[href*="all-requests.html"]');
        const completedCardLink = document.querySelector('.col-md-3 .text-decoration-none[href*="completed-requests.html"]');
        const overdueCardLink = document.querySelector('.col-md-3 .text-decoration-none[href*="overdue-requests.html"]');
        const pendingCardLink = document.querySelector('.col-md-3 .text-decoration-none[href*="pending-requests.html"]');
        const encodedEmployeeName = encodeURIComponent(employeeName);
        if (totalCardLink) totalCardLink.href = `all-requests.html${employeeName ? `?employee=${encodedEmployeeName}` : ''}`;
        if (completedCardLink) completedCardLink.href = `completed-requests.html${employeeName ? `?employee=${encodedEmployeeName}` : ''}`;
        if (overdueCardLink) overdueCardLink.href = `overdue-requests.html${employeeName ? `?employee=${encodedEmployeeName}` : ''}`;
        if (pendingCardLink) pendingCardLink.href = `pending-requests.html${employeeName ? `?employee=${encodedEmployeeName}` : ''}`;
    }

    const pageTitleElementOnLoad = document.querySelector('#page-content-wrapper h2'); 
    const urlParams = new URLSearchParams(window.location.search);
    const employeeParam = urlParams.get('employee');
    let requestsToLoad = allRequests; 

    if (employeeParam) {
        const decodedEmployeeName = decodeURIComponent(employeeParam);
        const lowerCaseEmployeeParam = decodedEmployeeName.toLowerCase();
        requestsToLoad = requestsToLoad.filter(req => 
            (req.sorguYazan && req.sorguYazan.toLowerCase().includes(lowerCaseEmployeeParam)) ||
            (req.icraEden && req.icraEden.toLowerCase().includes(lowerCaseEmployeeParam))
        );
        if (searchInput) {
            searchInput.value = decodedEmployeeName;
        }
        if (dashboardTitleElement) { 
            dashboardTitleElement.textContent = `Dashboard - ${decodedEmployeeName} üçün`;
        }
    }

    if (pageTitleElementOnLoad) {
        const pageTitle = pageTitleElementOnLoad.textContent.trim();
        if (currentPath.includes('index.html') || currentPath.endsWith('/panel/')) {
        } else if (currentPath.includes('all-requests.html')) {
        } else if (currentPath.includes('completed-requests.html')) {
            requestsToLoad = requestsToLoad.filter(req => req.vezziyyet === "İcra Olundu");
        } else if (currentPath.includes('overdue-requests.html')) {
            requestsToLoad = requestsToLoad.filter(req => req.vezziyyet === "Gecikib");
        } else if (currentPath.includes('pending-requests.html')) {
            requestsToLoad = requestsToLoad.filter(req => req.vezziyyet === "İcra Olunmayıb");
        } else if (pageTitle.includes('İstifadəçi İdarəetməsi')) {
            if (document.querySelector('#userTable tbody')) { 
                updateUsersTable(); 
            }
            return; 
        }
    }
    
    if (currentPath.includes('index.html') || currentPath.endsWith('/panel/') || 
        currentPath.includes('all-requests.html') || 
        currentPath.includes('completed-requests.html') ||
        currentPath.includes('overdue-requests.html') || 
        currentPath.includes('pending-requests.html')) 
    {
        updateDashboard(requestsToLoad); 
        updateClickableCards(employeeParam ? decodeURIComponent(employeeParam) : ""); 
    }

    const departmentFilters = document.querySelectorAll('.department-filter');
    departmentFilters.forEach(filterLink => {
        filterLink.addEventListener('click', function(event) {
            event.preventDefault(); 
            const selectedDepartment = filterLink.dataset.department; 
            let filteredRequests = [];
            if (selectedDepartment === 'All') { 
                filteredRequests = allRequests;
            } else {
                filteredRequests = allRequests.filter(req => req.sobe === selectedDepartment);
            }
            const currentEmployeeSearchTerm = searchInput ? searchInput.value.trim() : (employeeParam ? decodeURIComponent(employeeParam) : '');
            if (currentEmployeeSearchTerm) {
                const lowerCaseSearchTerm = currentEmployeeSearchTerm.toLowerCase();
                filteredRequests = filteredRequests.filter(req => 
                    (req.sorguYazan && req.sorguYazan.toLowerCase().includes(lowerCaseSearchTerm)) ||
                    (req.icraEden && req.icraEden.toLowerCase().includes(lowerCaseSearchTerm))
                );
            }
            if (dashboardTitleElement) {
                dashboardTitleElement.textContent = 'Dashboard';
            }
            if (searchInput) {
                searchInput.value = '';
            }
            updateClickableCards(""); 
            updateDashboard(filteredRequests); 
            sidebarLinks.forEach(link => link.classList.remove('active')); 
            filterLink.classList.add('active');
            const dropdownToggle = document.querySelector(`[href="#departmentsCollapse"]`);
            if (dropdownToggle) {
                dropdownToggle.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
                document.getElementById('departmentsCollapse').classList.remove('show');
            }
            const currentDashboardLink = document.querySelector('a[href="index.html"]');
            if(currentDashboardLink) {
                currentDashboardLink.classList.remove('active');
            }
        });
    });

    const userModal = document.getElementById('userModal');
    const userForm = document.getElementById('userForm');

    if (userForm) {
        userForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const id = document.getElementById('userId').value ? parseInt(document.getElementById('userId').value) : nextUserId;
            const username = document.getElementById('usernameInput').value.trim();
            const password = document.getElementById('passwordInput').value; 
            const selectedRoles = Array.from(document.getElementById('rolesInput').selectedOptions).map(option => option.value);
            if (!username) {
                alert("İstifadəçi adı boş ola bilməz!");
                return;
            }
            if (!document.getElementById('userId').value && !password) { 
                alert("Yeni istifadəçi üçün parol vacibdir!");
                return;
            }
            const existingUserIndex = allUsers.findIndex(u => u.id === id);
            if (existingUserIndex !== -1) {
                allUsers[existingUserIndex].username = username;
                if (password) { 
                    allUsers[existingUserIndex].password = password;
                }
                allUsers[existingUserIndex].roles = selectedRoles;
            } else {
                allUsers.push({
                    id: nextUserId++,
                    username: username,
                    password: password,
                    roles: selectedRoles
                });
            }
            const modalInstance = bootstrap.Modal.getInstance(userModal);
            if (modalInstance) {
                modalInstance.hide();
            }
            updateUsersTable(); 
            alert(`İstifadəçi ${username} uğurla ${existingUserIndex !== -1 ? 'redaktə edildi' : 'yaradıldı'}!`);
        });
    }
    if (userModal) {
        userModal.addEventListener('hidden.bs.modal', function () {
            userForm.reset();
            document.getElementById('passwordInput').removeAttribute('required'); 
            document.getElementById('userModalLabel').textContent = "Yeni İstifadəçi Yarat / Redaktə Et"; 
        });
    }
    
    document.querySelectorAll('.export-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const reportType = this.dataset.reportType;
            const reportFormat = this.dataset.reportFormat;

            let dataToExport = [];
            let filename = "";
            let tableHeaders = [];
            
            if (reportType === 'users') {
                dataToExport = allUsers.map(user => [user.id, user.username, '**********', user.roles.join(', ')]);
                tableHeaders = ['ID', 'İstifadəçi Adı', 'Parol', 'Rollar'];
                filename = `istifadeciler_report.${reportFormat}`;
            } else {
                let filteredRequests = [];
                switch (reportType) {
                    case 'all':
                        filteredRequests = allRequests;
                        filename = `umumi_sorgular_report.${reportFormat}`;
                        break;
                    case 'completed':
                        filteredRequests = allRequests.filter(req => req.vezziyyet === "İcra Olundu");
                        filename = `icra_olunmus_sorgular_report.${reportFormat}`;
                        break;
                    case 'overdue':
                        filteredRequests = allRequests.filter(req => req.vezziyyet === "Gecikib");
                        filename = `geciken_sorgular_report.${reportFormat}`;
                        break;
                    case 'pending':
                        filteredRequests = allRequests.filter(req => req.vezziyyet === "İcra Olunmayıb");
                        filename = `icra_olunmamis_sorgular_report.${reportFormat}`;
                        break;
                    default:
                        console.error("Naməlum report tipi:", reportType);
                        return;
                }

                dataToExport = filteredRequests.map(req => [
                    req.id,
                    req.sorguYazan,
                    req.company,
                    req.yazilmaTarihi,
                    req.icraEden,
                    req.icraTarixi,
                    req.description,
                    req.notes,
                    req.sobe,
                    req.vezziyyet
                ]);
                
                tableHeaders = ['#', 'Sorğu Yazarı', 'Şirkət Adı', 'Yazılma Tarixi', 'İcra Edən', 'İcra Tarixi', 'Məlumat', 'Qeydlər', 'Şöbə', 'Vəziyyət'];
            }

            if (dataToExport.length === 0) {
                alert("Export ediləcək məlumat yoxdur.");
                return;
            }

            if (reportFormat === 'xlsx') {
                const worksheet = XLSX.utils.aoa_to_sheet([tableHeaders, ...dataToExport]);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Hesabat");
                XLSX.writeFile(workbook, filename);
            } else if (reportFormat === 'pdf') {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.autoTable({
                    head: [tableHeaders],
                    body: dataToExport,
                    startY: 10,
                    styles: {
                        fontSize: 8,
                        cellPadding: 2
                    },
                    columnStyles: {
                        7: { cellWidth: 'auto' }
                    }
                });
                pdf.save(filename);
            }
        });
    });
    
    // YENİ: Chart Funksiyaları Başlanğıcı

    function renderCharts(data) {
        // Chart.js yüklənməyibsə çıxış et
        if (typeof Chart === 'undefined') return;

        // 1. Məlumatların hazırlanması
        const departmentCounts = data.reduce((acc, req) => {
            acc[req.sobe] = (acc[req.sobe] || 0) + 1;
            return acc;
        }, {});
        const statusCounts = data.reduce((acc, req) => {
            acc[req.vezziyyet] = (acc[req.vezziyyet] || 0) + 1;
            return acc;
        }, {});
        const userCounts = data.reduce((acc, req) => {
            if (req.sorguYazan) {
                acc[req.sorguYazan] = (acc[req.sorguYazan] || 0) + 1;
            }
            return acc;
        }, {});
        
        const topUsers = Object.entries(userCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5); // Ən çox sorğu yazan 5 nəfər


        // Rəng palitrası
        const colors = [
            '#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8', '#6610f2', '#fd7e14', '#e83e8c'
        ];


        // Köməkçi funksiya: Əvvəlki chart nümunələrini yoxlamaq və məhv etmək
        function destroyChart(chartInstance) {
            if (chartInstance) {
                chartInstance.destroy();
            }
        }


        // 2. 2D Pie Chart (Şöbələr)
        const deptCtx = document.getElementById('departmentPieChart');
        if (deptCtx) {
            destroyChart(departmentPieChartInstance);
            departmentPieChartInstance = new Chart(deptCtx, {
                type: 'pie',
                data: {
                    labels: Object.keys(departmentCounts),
                    datasets: [{
                        data: Object.values(departmentCounts),
                        backgroundColor: colors.slice(0, Object.keys(departmentCounts).length),
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, 
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: false,
                        }
                    }
                }
            });
        }


        // 3. Doughnut Chart (Vəziyyətlər)
        const statusCtx = document.getElementById('statusDoughnutChart');
        if (statusCtx) {
            destroyChart(statusDoughnutChartInstance);
            statusDoughnutChartInstance = new Chart(statusCtx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(statusCounts),
                    datasets: [{
                        data: Object.values(statusCounts),
                        backgroundColor: [colors[1], colors[3], colors[2]], // Yaşıl, Qırmızı, Sarı
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        }
                    }
                }
            });
        }


        // 4. Bar Chart (Ən Çox Sorğu Yazarı)
        const usersCtx = document.getElementById('topUsersBarChart');
        if (usersCtx) {
            destroyChart(topUsersBarChartInstance);
            topUsersBarChartInstance = new Chart(usersCtx, {
                type: 'bar',
                data: {
                    labels: topUsers.map(u => u[0]),
                    datasets: [{
                        label: 'Sorğu Sayı',
                        data: topUsers.map(u => u[1]),
                        backgroundColor: colors[0], 
                        borderColor: colors[0], 
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                        }
                    }
                }
            });
        }
    }
    // END: Chart Funksiyaları
}); // DOMContentLoaded end





// ==========================================
// YENİ ƏLAVƏ: BACKEND-DƏN MƏLUMAT ÇƏKMƏK
// ==========================================

const API_BASE_URL = "http://localhost:8080/api";

// Səhifə tam açılanda bu funksiyanı işə sal
document.addEventListener("DOMContentLoaded", () => {
    // Əgər sənin yuxarıdakı kodunda başqa listenerlər varsa, bu onlara mane olmur
    loadTickets(); 
});

async function loadTickets() {
    const tableBody = document.querySelector("#requestTable tbody");
    if (!tableBody) return; // Əgər cədvəl yoxdursa, heç nə etmə (xəta çıxmasın)

    try {
        const response = await fetch(`${API_BASE_URL}/tickets`, {
            method: "GET",
            headers: AuthService.getAuthHeader()
        });

        if (response.status === 401) {
            AuthService.logout(); // Token vaxtı bitibsə çıxış ver
            return;
        }

        const tickets = await response.json();
        
        // Cədvəli təmizlə
        tableBody.innerHTML = "";

        if (tickets.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="10" class="text-center">Heç bir sorğu tapılmadı.</td></tr>`;
            return;
        }

        // Cədvəli doldur
        tickets.forEach((ticket, index) => {
            const row = `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${ticket.username || 'Admin'}</td>
                    <td>${ticket.source || '-'}</td>
                    <td>${formatDate(ticket.createdAt)}</td>
                    <td>${ticket.assignedTo || '<span class="text-muted">Boş</span>'}</td>
                    <td>${ticket.closedAt ? formatDate(ticket.closedAt) : '-'}</td>
                    <td>${ticket.title}</td>
                    <td class="text-truncate" style="max-width: 150px;">${ticket.description || '-'}</td>
                    <td>${ticket.category || 'Ümumi'}</td>
                    <td>${getStatusBadge(ticket.status)}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
        
        // Kartlardakı rəqəmləri yenilə (əgər funksiya varsa)
        if(typeof updateDashboardStats === 'function') {
             updateDashboardStats(tickets);
        }

    } catch (error) {
        console.error("Ticketləri gətirərkən xəta:", error);
    }
}

// Köməkçi funksiyalar
function getStatusBadge(status) {
    let colorClass = "bg-secondary";
    let text = status;
    if (status === "OPEN") { colorClass = "bg-success"; text = "Açıq"; }
    else if (status === "IN_PROGRESS") { colorClass = "bg-warning text-dark"; text = "İcrada"; }
    else if (status === "CLOSED") { colorClass = "bg-danger"; text = "Bağlı"; }
    return `<span class="badge ${colorClass}">${text}</span>`;
}

function formatDate(isoString) {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleString('az-AZ');
}