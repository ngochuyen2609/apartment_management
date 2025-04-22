// Hoạt động đăng xuất 

const userButton = document.querySelector('.nav-user-icon');
const userOptionsContainer = document.querySelector('.user-list-options');
userButton.addEventListener('click', () => {
    if (userOptionsContainer.style.display === 'none' || !userOptionsContainer.style.display) {
        userOptionsContainer.style.display = 'block';
    }
    else {
        userOptionsContainer.style.display = 'none';
    }
});

const logoutButton = document.querySelector('.logout-button');
console.log(localStorage);
function logoutAction(callback) {
    fetch("http://localhost:8080/project/auth/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.accessToken,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Đăng xuất thất bại. Vui lòng kiểm tra lại!');
            }
            return response.json();
        })
        .then(function (data) {
            console.log('dữ liệu đăng xuất', data, localStorage);
            callback(data);
        })
        .catch(error => {
            console.error('Lỗi khi đăng xuất:', error);
        });
}
logoutButton.addEventListener('click', () => {
    logoutAction(function (response) {
        console.log(response, localStorage);
        if (response.code === 200) {
            localStorage.removeItem('accessToken');
            window.location.href = 'http://127.0.0.1:5500/Login/login.html';
        }
        else {
            alert('Đăng xuất thất bại. Vui lòng thử lại!');
        }
    });
});