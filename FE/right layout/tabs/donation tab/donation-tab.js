// Đóng mở mục tạo mới
const donationModalOpen = document.querySelector('.donation-tab-create-btn');
const donationContainer = document.querySelector('.donation-modal-container');
// console.log(donationModalOpen, donationModalSave, donationModalClose);
donationModalOpen.addEventListener('click', function (e) {
    donationContainer.classList.add('donation-modal-open');
    donationContainer.querySelector('input[name="donationApartmentName"]').value = "";
    donationContainer.querySelector('input[name="apartmentAmountPaid"]').value = "";
    donationContainer.querySelector('input[name="apartmentPaymentMethod"]').value = "";
    donationContainer.querySelector('.donation-input-type-body span').textContent = "";
    donationContainer.querySelector('.donation-modal-title-text').textContent = "Thêm mới phí";
    let htmls = `
        <div class="donation-modal-button">
            <button class="donation-modal-close-button">
                <span class="donation-modal-close-button-text"> Hủy </span>
            </button>
            <button class="donation-modal-save-button">
                <span class="donation-modal-save-button-text"> Lưu </span>
            </button>
        </div>
    `;
    donationContainer.querySelector('.donation-modal-button').innerHTML = "";
    donationContainer.querySelector('.donation-modal-button').innerHTML = htmls;
    const donationModalSave = document.querySelector('.donation-modal-save-button');
    const donationModalClose = document.querySelector('.donation-modal-close-button');
    donationModalClose.addEventListener('click', function (e) {
        donationContainer.classList.remove('donation-modal-open');
    });
    const donationSaveButton = document.querySelector('.donation-modal-save-button');
    donationSaveButton.addEventListener('click', function (e) {
        donationContainer.classList.remove('donation-modal-open');
        let aparmentNameInput = donationContainer.querySelector('input[name="donationApartmentName"]').value;
        let apartmentIdInput = listApartments.find(function (apt) {
            return apt.apartmentName === aparmentNameInput;
        }).id;
        let chargeTypeIdInput = donationContainer.querySelector('.donation-input-type-body span').getAttribute('name');
        let amountPaidInput = donationContainer.querySelector('input[name="apartmentAmountPaid"]').value;
        let paymentMethodInput = nameMethodListVN[donationContainer.querySelector('input[name="apartmentPaymentMethod"]').value.trim()];
        var newDonationCharge = {
            apartmentId: apartmentIdInput,
            chargeId: chargeTypeIdInput,
            amountPaid: amountPaidInput,
            paymentMethod: paymentMethodInput
        }
        createNewDonationCharges(newDonationCharge, function (response) {
            if (response.code === 200) {
                console.log('Dữ liệu phản hồi: ', response);
                listDonationCharges.push(response.result);
                renderCharges([response.result]);
            } else {
                alert("Lỗi: Không thể thêm căn hộ. Vui lòng điền đầy đủ thông tin!");
            }
            donationContainer.querySelector('input[name="donationApartmentName"]').value = "";
            donationContainer.querySelector('input[name="apartmentAmountPaid"]').value = "";
            donationContainer.querySelector('input[name="apartmentPaymentMethod"]').value = "";
            donationContainer.querySelector('.donation-input-type-body span').textContent = "";
        });
    });
});

// Filter lọc danh sách theo loại chuyển khoản
const donationMethodSelector = document.querySelectorAll('.donation-method-list-item');
const donationMethodList = document.querySelector('.donation-method-list');
var rowTableList = document.querySelectorAll('.donation-table .table-row');
donationMethodSelector.forEach(method => method.addEventListener('click', function (e) {
    const liSelector = e.target.closest('li');
    const textSelector = liSelector.querySelector('span').textContent;
    const typeText = document.querySelector('.donation-tab-search-method-text');
    typeText.textContent = textSelector;
    typeText.classList.add('donation-tab-search-method-active');
    donationMethodList.classList.add('hidden');
    setTimeout(() => {
        donationMethodList.classList.remove('hidden');
    }, 100);

    rowTableList.forEach(row => {
        row.classList.add('table-row-hide');
        const nameRow = row.querySelector('.paymentMethod').getAttribute('name');
        if (nameRow === liSelector.getAttribute('name') || liSelector.getAttribute('name') === 'all-method') {
            row.classList.remove('table-row-hide');
        }
    })
}));

//  filter lọc phương thức thanh toán
const createMethodSelector = document.querySelectorAll('.input-method-list-item');
createMethodSelector.forEach(method => method.addEventListener('click', function (e) {
    const liSelector = e.target.closest('li');
    const ulSelector = liSelector.closest('ul');
    const textSelector = liSelector.querySelector('span').textContent;
    const inputMethod = document.querySelector('.input-method input');
    inputMethod.value = textSelector;
    ulSelector.classList.add('hidden');
    setTimeout(() => {
        ulSelector.classList.remove('hidden');
    }, 100);
}));

// Khởi tạo
var donationChargeApi = "http://localhost:8080/project/apartmentCharge";
var listDonationCharges = [];
var listDonationType = [];
function start() {
    getAllCharges(renderCharges);
    getAllChargeType(renderTypes);
    handleCreateNewCharge();
    // console.log("Khởi tạo thành công");
}
start();
function getAllCharges(callback = () => { }) {
    fetch(donationChargeApi)
        .then(function (response) {
            if (!response.ok) {
                console.error("Error fetching donation charges:", response.status);
                throw new Error("Failed to fetch donation charges: " + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            if (data.code === 200) {
                listDonationCharges = data.result.filter(function (charge) {
                    return charge.chargeType === 'DONATION';
                });
                callback(listDonationCharges);
            }
        })
        .catch(function (error) {
            console.error("Fetch error:", error.message);
            alert("Không thể tải dữ liệu: " + error.message);
        });
}

function getAllChargeType(callback = () => { }) {
    fetch("http://localhost:8080/project/charge")
        .then(function (response) {
            if (!response.ok) {
                console.error("Error fetching donation charges:", response.status);
                throw new Error("Failed to fetch donation charges: " + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            if (data.code === 200) {
                listDonationType = data.result;
                console.log('danh sách phí:', listDonationType);
                callback(listDonationType);
            }
        })
        .catch(function (error) {
            console.error("Fetch error:", error.message);
            alert("Không thể tải dữ liệu: " + error.message);
        });
}

/* Tạo mới thông tin nộp phí */
function createNewDonationCharges(data, callback = () => { }) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(donationChargeApi, options)
        .then(function (response) {
            if (!response.ok) {
                console.log('Dữ liệu của throw:', response);
                console.error("Error fetching charges:", response.status);
                throw new Error("Dữ liệu chưa đúng yêu cầu");
            }
            return response.json();
        })
        .then(function (data) {
            code = data.code;
            callback(data);
        })
        .catch(function (error) {
            console.error("Fetch error:", error.message);
            alert(error.message);
        });
}

const nameMethodListEN = {
    "CASH": "Tiền mặt",
    "BANK_TRANSFER": "Chuyển khoản",
    "CREDIT_CARD": "Thẻ tín dụng"
}

var nameMethodListVN = {
    'Tiền mặt': 'CASH',
    'Chuyển khoản': 'BANK_TRANSFER',
    'Thẻ tín dụng': 'CREDIT_CARD'
}
function handleCreateNewCharge() {
    const donationSaveButton = document.querySelector('.donation-modal-save-button');
    donationSaveButton.addEventListener('click', function (e) {
        let aparmentNameInput = donationContainer.querySelector('input[name="donationApartmentName"]').value;
        let apartmentIdInput = listApartments.find(function (apt) {
            return apt.apartmentName === aparmentNameInput;
        }).id;
        let chargeTypeIdInput = donationContainer.querySelector('.donation-input-type-body span').getAttribute('name');
        let amountPaidInput = donationContainer.querySelector('input[name="apartmentAmountPaid"]').value;
        let paymentMethodInput = nameMethodListVN[donationContainer.querySelector('input[name="apartmentPaymentMethod"]').value.trim()];
        var newDonationCharge = {
            apartmentId: apartmentIdInput,
            chargeId: chargeTypeIdInput,
            amountPaid: amountPaidInput,
            paymentMethod: paymentMethodInput
        }
        createNewDonationCharges(newDonationCharge, function (response) {
            if (response.code === 200) {
                console.log('Dữ liệu phản hồi: ', response);
                listDonationCharges.push(response.result);
                renderCharges([response.result]);
            } else {
                alert("Lỗi: Không thể thêm căn hộ. Vui lòng điền đầy đủ thông tin!");
            }
            donationContainer.querySelector('input[name="donationApartmentName"]').value = "";
            donationContainer.querySelector('input[name="apartmentAmountPaid"]').value = "";
            donationContainer.querySelector('input[name="apartmentPaymentMethod"]').value = "";
            donationContainer.querySelector('.donation-input-type-body span').textContent = "";
        });
    });
}

// Xóa một phí
function handleDeleteDonationCharge(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(donationChargeApi + '/' + id, options)
        .then(function (response) {
            if (!response.ok) {
                console.log('Dữ liệu của throw:', response);
                console.error("Error fetching charges:", response.status);
                throw new Error("Failed to fetch charges: " + response.statusText);
            }
            return response.json();
        })
        .then(function () {
            let donationchargeSelect = document.getElementById('donation-charge-' + id);
            // console.log(donationchargeSelect, 'donation-charge-' + id);
            if (donationchargeSelect) {
                donationchargeSelect.remove();
            }
        })
}

// cập nhật phí
function updateDonationCharge(id, data, callback = () => { }) {
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(donationChargeApi + '/' + id, options)
        .then(function (response) {
            if (!response.ok) {
                console.log('Dữ liệu của throw:', response);
                console.error("Error fetching charges:", response.status);
                throw new Error("Failed to fetch charges: " + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            if (data.code === 200) {
                callback(data);
            } else {
                alert("Cập nhật thất bại: " + data.message);
            }
        })
        .catch(function (error) {
            console.error("Fetch error:", error.message);
            alert("Lỗi: Không thể cập nhật phí đóng góp: " + error.message);
        });
}


function handleUpdateDonationCharge(id) {
    donationContainer.classList.add('donation-modal-open');
    donationContainer.querySelector('.donation-modal-title-text').textContent = "Chỉnh sửa";
    let htmls = `
        <div class="edit-donation-modal-button">
            <button class="edit-donation-modal-close-button">
                <span class="edit-donation-modal-close-button-text"> Hủy </span>
            </button>
            <button class="edit-donation-modal-save-button">
                <span class="edit-donation-modal-save-button-text"> Lưu </span>
            </button>
        </div>
    `;
    donationContainer.querySelector('.donation-modal-button').innerHTML = "";
    donationContainer.querySelector('.donation-modal-button').innerHTML = htmls;
    let editDonationModalClose = document.querySelector('.edit-donation-modal-close-button');
    let editDonationModalSave = document.querySelector('.edit-donation-modal-save-button');
    editDonationModalClose.addEventListener('click', function (e) {
        donationContainer.classList.remove('donation-modal-open');
    });
    let listAtrributes = listDonationCharges.find(function (cur) {
        return cur.id === id;
    })
    // console.log(listAtrributes);
    donationContainer.querySelector('input[name="donationApartmentName"]').value = listAtrributes.apartmentName;
    donationContainer.querySelector('.donation-input-type-text').textContent = listAtrributes.chargeName;
    donationContainer.querySelector('input[name="apartmentAmountPaid"]').value = listAtrributes.amountPaid;
    donationContainer.querySelector('input[name="apartmentPaymentMethod"]').value = nameMethodListEN[listAtrributes.paymentMethod];

    editDonationModalSave.onclick = function (e) {
        donationContainer.classList.remove('donation-modal-open');
        let apartmentDonationNameInput = donationContainer.querySelector('input[name="donationApartmentName"]').value;
        let apartmentIdInput = listApartments.find(function (apt) {
            return apt.apartmentName === apartmentDonationNameInput;
        }).id;
        let chargeDonationNameInput = donationContainer.querySelector('.donation-input-type-text').textContent.trim();
        let chargeTypeIdInput = listDonationType.find(function (cur) {
            return cur.chargeName === chargeDonationNameInput;
        }).id;
        let aparmentDonationAmountPaidInput = donationContainer.querySelector('input[name="apartmentAmountPaid"]').value;
        let paymentMethodDonationInput = nameMethodListVN[donationContainer.querySelector('input[name="apartmentPaymentMethod"]').value.trim()];
        var editedDonationCharge = {
            apartmentId: apartmentIdInput,
            chargeId: chargeTypeIdInput,
            amountPaid: aparmentDonationAmountPaidInput,
            paymentMethod: paymentMethodDonationInput
        }
        updateDonationCharge(id, editedDonationCharge, function (response) {
            console.log(response);
            if (response.code === 200) {
                let chargeEditedTable = document.getElementById('donation-charge-' + id);
                chargeEditedTable.querySelector('.apartmentName').textContent = apartmentDonationNameInput;
                chargeEditedTable.querySelector('.chargeName').textContent = chargeDonationNameInput;
                chargeEditedTable.querySelector('.chargeName').setAttribute('name', chargeTypeIdInput);
                chargeEditedTable.querySelector('.amountPaid').textContent = aparmentDonationAmountPaidInput;
                let paymentMethodIP = chargeEditedTable.querySelector('.paymentMethod');
                paymentMethodIP.textContent = nameMethodListEN[paymentMethodDonationInput];
                paymentMethodIP.setAttribute('name', paymentMethodDonationInput);
                // console.log(typeof paymentMethodIP.getAttribute('name'), typeof paymentMethodDonationInput);
                listAtrributes.apartmentName = apartmentDonationNameInput;
                listAtrributes.chargeName = chargeDonationNameInput;
                listAtrributes.amountPaid = aparmentDonationAmountPaidInput;
                listAtrributes.paymentMethod = paymentMethodDonationInput;
                // getAllCharges();
                // getAllChargeType();
            } else {
                alert("Cập nhật thất bại: " + response.message);
            }

        })

    };

}

// Xuất dữ liệu
function renderCharges(charges) {
    var listCharges = document.querySelector('.donation-table tbody');
    var htmls = charges.map(function (charge) {
        return `
        <tr class="table-row" id="donation-charge-${charge.id}">
            <td class="apartmentName">${charge.apartmentName}</td>
            <td name="${charge.chargeId}" class="chargeName">${charge.chargeName}</td>
            <td class="amountPaid">${charge.amountPaid}</td>
            <td name="${charge.paymentMethod}" class="paymentMethod"> ${nameMethodListEN[charge.paymentMethod]} </td>
            <td class="table-icons">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                    width="24px" fill="#6c757d" class="table-icon" onclick="handleUpdateDonationCharge('${charge.id}')">
                    <path
                        d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                    width="24px" fill="#6c757d" class="table-icon" onclick="handleDeleteDonationCharge('${charge.id}')">
                    <path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
            </td>
        </tr>
        `;

    });
    listCharges.innerHTML += htmls.join('');
    rowTableList = document.querySelectorAll('.donation-table .table-row');
}

function renderTypes(types) {
    console.log('renderTypes: ', types);
    let donationTypeContainer = document.querySelector('.donation-type-list');
    let htmlDonations = types.filter(function (tp) {
        return tp.type === 'DONATION';
    }).map(function (type) {
        return `
            <li name="${type.id}" class="donation-type-list-item type-list-item-${type.id}">
                <span> ${type.chargeName} </span>
            </li>
        `;
    });
    donationTypeContainer.innerHTML += htmlDonations.join('');

    let donationTypeContainer2 = document.querySelector('.donation-input-type-list');
    let htmlDonations2 = types.filter(function (tp) {
        return tp.type === 'DONATION';
    }).map(function (type) {
        return `
            <li name="${type.id}" class="donation-input-type-list-item type-list-item-${type.id}">
                <span> ${type.chargeName} </span>
            </li>
        `;
    });
    donationTypeContainer2.innerHTML += htmlDonations2.join('');

    let donationTypeSelector = document.querySelectorAll('.donation-type-list-item');
    let donationTypeList = document.querySelector('.donation-type-list');
    donationTypeSelector.forEach(type => type.addEventListener('click', function (e) {
        const liSelector = e.target.closest('li');
        const textSelector = liSelector.querySelector('span').textContent;
        const typeText = document.querySelector('.donation-tab-search-type-text');
        typeText.textContent = textSelector;
        typeText.classList.add('donation-tab-search-type-active');
        donationTypeList.classList.add('hidden');
        setTimeout(() => {
            donationTypeList.classList.remove('hidden');
        }, 100);
        rowTableList.forEach(row => {
            row.classList.add('table-row-hide');
            const nameRow = row.querySelector('.chargeName').getAttribute('name');
            if (nameRow === liSelector.getAttribute('name') || liSelector.getAttribute('name') === 'donation-all-type') {
                row.classList.remove('table-row-hide');
            }
        })
    }));

    let donationTypeSelector2 = document.querySelectorAll('.donation-input-type-list-item');
    let donationTypeList2 = document.querySelector('.donation-input-type-list');
    donationTypeSelector2.forEach(type => type.addEventListener('click', function (e) {
        const liSelector = e.target.closest('li');
        const textSelector = liSelector.querySelector('span').textContent;
        const typeText = document.querySelector('.donation-input-type-text');
        typeText.textContent = textSelector;
        typeText.setAttribute('name', type.getAttribute('name'));
        donationTypeList2.classList.add('hidden');
        setTimeout(() => {
            donationTypeList2.classList.remove('hidden');
        }, 100);
    }));
}