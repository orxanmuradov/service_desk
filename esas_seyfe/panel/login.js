 document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const loginMessage = document.getElementById('loginMessage'); // For displaying success/error messages

    loginForm.addEventListener('submit', function(event) {
        // Formun standart göndərilməsini dayandırırıq
        event.preventDefault();

        // Error mesajlarını sıfırlayırıq
        usernameInput.classList.remove('is-invalid');
        passwordInput.classList.remove('is-invalid');
        usernameError.style.display = 'none';
        passwordError.style.display = 'none';
        loginMessage.classList.add('d-none'); // Hide any previous messages

        let isValid = true;

        // İstifadəçi adı validasiyası
        if (usernameInput.value.trim() === '') {
            usernameInput.classList.add('is-invalid');
            usernameError.style.display = 'block';
            isValid = false;
        }

        // Parol validasiyası
        if (passwordInput.value.trim() === '') {
            passwordInput.classList.add('is-invalid');
            passwordError.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            // Hələlik sadə bir yoxlama, realda serverə sorğu göndəriləcək
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === 'admin' && password === 'admin123') { // Nümunə doğrulaması
                loginMessage.classList.remove('d-none', 'alert-danger');
                loginMessage.classList.add('alert-success');
                loginMessage.textContent = 'Giriş uğurludur! Yönləndirilirsiniz...';
                // Uğurlu giriş halında dashboard səhifəsinə yönləndirmə
                setTimeout(() => {
                    window.location.href = 'dashboard.html'; // Növbəti mərhələdə yaradacağımız səhifə
                }, 1500); // 1.5 saniyə gecikmə
            } else {
                loginMessage.classList.remove('d-none', 'alert-success');
                loginMessage.classList.add('alert-danger');
                loginMessage.textContent = 'İstifadəçi adı və ya parol yanlışdır!';
            }
        }
    });
});