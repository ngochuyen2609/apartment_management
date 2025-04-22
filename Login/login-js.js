// Đóng mở mục menu
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});
menuCloseButton.addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
});

// Initialize Swiper
const swiper = new Swiper('.slide-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // responsive breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});


// Đóng mở mục đăng nhập
const loginModalOpen = document.querySelectorAll('.login-button');
const loginModalContainer = document.querySelector('.login-container');
const loginModalClose = document.querySelector('.login-close-icon');

loginModalOpen.forEach(btn => btn.addEventListener('click', function (e) {
    registerModalContainer.classList.remove('register-modal-open');
    loginModalContainer.classList.add('login-modal-open');
}));

loginModalClose.addEventListener('click', function (e) {
    loginModalContainer.classList.remove('login-modal-open');
});

// Đóng mở mục đăng ký tài khoản

const registerModalContainer = document.querySelector('.register-container');
const registerModalOpen = document.querySelectorAll('.register-button');
const registerModalClose = document.querySelector('.register-close-icon');

registerModalOpen.forEach(btn => btn.addEventListener('click', function (e) {
    loginModalContainer.classList.remove('login-modal-open');
    registerModalContainer.classList.add('register-modal-open');
}));

registerModalClose.addEventListener('click', function (e) {
    registerModalContainer.classList.remove('register-modal-open');
});

const logInApi = "http://localhost:8080/project/auth/login";
const logOutApi = "http://localhost:8080/project/auth/logout";
const resgisterApi = "http://localhost:8080/project/auth/register";

// Hoạt động đăng ký
localStorage.clear();
console.log(localStorage);
function registerAction(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    fetch(resgisterApi, options)
        .then(response => {
            if (!response.ok) {
                alert('Đăng ký thất bại. Vui lòng kiểm tra lại!');
                throw new Error('Đăng ký thất bại. Vui lòng kiểm tra lại!');
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            callback(data);
        })
        .catch(function (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại sau!', 'error');
        });
}
const registerButton = document.querySelector('.form-register-button');

registerButton.addEventListener('click', function (e) {
    let userName = document.querySelector('.register-user-name').value.trim();
    let password = document.querySelector('.register-password').value.trim();
    let repeatPassword = document.querySelector('.register-repeat-password').value.trim();
    if (repeatPassword !== password) {
        alert('Mật khẩu nhập lại không trùng khớp!');
        return;
    }
    var userAccount = {
        username: userName,
        password: password
    }
    registerAction(userAccount, function (response) {
        if (response.code !== 200) {
            alert('Đăng ký thất bại! Hãy thử lại.');
            console.log(response);
        }
        registerModalContainer.classList.remove('register-modal-open');
    });
});

// Hoạt động đăng nhập 
const loginButton = document.querySelector('.form-login-button');

function loginAction(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    fetch(logInApi, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Đăng nhập thất bại. Vui lòng kiểm tra lại!');
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            callback(data);
        })
        .catch(function (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại sau!', 'error');
        });
}

loginButton.addEventListener('click', function (e) {
    let userName = document.querySelector('.login-user-name').value.trim();
    let password = document.querySelector('.login-password').value.trim();
    if (!userName || !password) {
        alert('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
        return;
    }
    var userAccount = {
        username: userName,
        password: password
    }
    console.log(userAccount);
    loginAction(userAccount, function (response) {
        loginModalContainer.classList.remove('login-modal-open');
        if (response.code === 200) {
            console.log(response);
            if (response.result && response.result.accessToken) {
                localStorage.setItem('accessToken', response.result.accessToken);
                console.log(localStorage);
            }
            window.location.href = 'http://127.0.0.1:5500/FE/index/html/index.html';
        }
        else {
            alert('Đăng nhập thất bại! Hãy thử lại');
            console.log(response);
        }
    });
});

// Chuyển mục 

var sectionList = document.querySelectorAll('.nav-link');

sectionList.forEach(section => section.addEventListener('click', function () {
    let targetId = this.getAttribute('data-target');
    let targetElement = document.getElementById(targetId);
    if (targetElement) {
        console.log(targetElement);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}));