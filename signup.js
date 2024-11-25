document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(signupForm);
        const user = {
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        // Check password validity
        if (user.password !== user.confirmPassword) {
            displayMessage('Mật khẩu không khớp', 'error');
            return;
        }

        // Check if email is already registered
        const emailExists = await checkEmailExists(user.email);
        if (emailExists) {
            displayMessage('Email đã được đăng ký', 'error');
            return;
        }

        // Send registration request
        const response = await registerUser(user);
        if (response.success) {
            displayMessage('Đăng ký thành công. Vui lòng kiểm tra email để xác nhận tài khoản.', 'success');
            sendVerificationEmail(user.email);
        } else {
            displayMessage(response.message, 'error');
        }
    });

    function displayMessage(message, type) {
        const messageBox = document.getElementById('messageBox');
        messageBox.textContent = message;
        messageBox.className = type;
    }

    async function checkEmailExists(email) {
        // Simulate an API call to check if the email is already registered
        const response = await fetch('/api/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        return data.exists;
    }

    async function registerUser(user) {
        // Simulate an API call to register the user
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    }

    async function sendVerificationEmail(email) {
        // Simulate an API call to send a verification email
        await fetch('/api/send-verification-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
    }

    // Language change functionality
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = languageSelect.value;
        changeLanguage(selectedLanguage);
    });

    function changeLanguage(language) {
        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang');
            element.textContent = translations[language][key];
        });
    }

    const translations = {
        vi: {
            'signup': 'Đăng ký',
            'email': 'Email',
            'password': 'Mật khẩu',
            'confirmPassword': 'Xác nhận mật khẩu',
            'submit': 'Gửi'
        },
        ja: {
            'signup': 'サインアップ',
            'email': 'メール',
            'password': 'パスワード',
            'confirmPassword': 'パスワードを認証する',
            'submit': '送信'
        }
    };
});