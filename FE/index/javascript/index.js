var openCommonTab = document.getElementById('common-icon');
var openDonationTab = document.getElementById('donation-icon');
var openServiceTab = document.getElementById('service-icon');
var openBuildingsTab = document.getElementById('buildings-icon');
var openHistoryTab = document.getElementById('history-icon');
var openSettingsTab = document.getElementById('settings-icon');
var openResidentTab = document.getElementById('resident-icon');

openCommonTab.addEventListener('click', function (e) {
    var x = document.getElementsByClassName('website-tab');
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    var y = document.getElementsByClassName('common-tab-all');
    for (var i = 0; i < y.length; i++) {
        y[i].style.display = 'block';
    }
    var z = document.getElementsByClassName('sidebar-body-item');
    for (var i = 0; i < z.length; i++) {
        z[i].classList.remove('tab-sidebar-active');
    }
    this.classList.add('tab-sidebar-active');
});

openDonationTab.addEventListener('click', function (e) {
    var x = document.getElementsByClassName('website-tab');
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    var y = document.getElementsByClassName('donation-tab-all');
    for (var i = 0; i < y.length; i++) {
        y[i].style.display = 'block';
    }
    var z = document.getElementsByClassName('sidebar-body-item');
    for (var i = 0; i < z.length; i++) {
        z[i].classList.remove('tab-sidebar-active');
    }
    this.classList.add('tab-sidebar-active');
});

openServiceTab.addEventListener('click', function (e) {
    var x = document.getElementsByClassName('website-tab');
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    var y = document.getElementsByClassName('service-tab-all');
    for (var i = 0; i < y.length; i++) {
        y[i].style.display = 'block';
    }
    var z = document.getElementsByClassName('sidebar-body-item');
    for (var i = 0; i < z.length; i++) {
        z[i].classList.remove('tab-sidebar-active');
    }
    this.classList.add('tab-sidebar-active');
});

openBuildingsTab.addEventListener('click', function (e) {
    var x = document.getElementsByClassName('website-tab');
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    var y = document.getElementsByClassName('buildings-tab-all');
    for (var i = 0; i < y.length; i++) {
        y[i].style.display = 'block';
    }
    var z = document.getElementsByClassName('sidebar-body-item');
    for (var i = 0; i < z.length; i++) {
        z[i].classList.remove('tab-sidebar-active');
    }
    this.classList.add('tab-sidebar-active');
});

openHistoryTab.addEventListener('click', function (e) {
    var x = document.getElementsByClassName('website-tab');
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    var y = document.getElementsByClassName('history-tab-all');
    for (var i = 0; i < y.length; i++) {
        y[i].style.display = 'block';
    }
    var z = document.getElementsByClassName('sidebar-body-item');
    for (var i = 0; i < z.length; i++) {
        z[i].classList.remove('tab-sidebar-active');
    }
    this.classList.add('tab-sidebar-active');
});

openResidentTab.addEventListener('click', function (e) {
    var x = document.getElementsByClassName('website-tab');
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    var y = document.getElementsByClassName('resident-tab-all');
    for (var i = 0; i < y.length; i++) {
        y[i].style.display = 'block';
    }
    var z = document.getElementsByClassName('sidebar-body-item');
    for (var i = 0; i < z.length; i++) {
        z[i].classList.remove('tab-sidebar-active');
    }
    this.classList.add('tab-sidebar-active');
});