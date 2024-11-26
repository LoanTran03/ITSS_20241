document.addEventListener('DOMContentLoaded', (event) => {
    const loginBtn = document.getElementById('loginBtn');

    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'end.html';
    });
});