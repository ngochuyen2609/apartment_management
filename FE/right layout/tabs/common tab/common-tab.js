// Đóng mở mục Tạo mới
const commonModalOpen = document.querySelector('.common-tab-create-btn');
const commonModalClose = document.querySelector('.common-modal-close-button');
const commonModalSave = document.querySelector('.common-modal-save-button');
const commonContainer = document.querySelector('.common-modal-container');
commonModalOpen.addEventListener('click', function (e) {
    commonContainer.classList.add('common-modal-open');
});
commonModalClose.addEventListener('click', function (e) {
    commonContainer.classList.remove('common-modal-open');
});
commonModalSave.addEventListener('click', function (e) {
    commonContainer.classList.remove('common-modal-open');
});

// Đóng mở modal chỉnh sửa
var editChargeModalContainer = document.querySelector('.edit-common-modal-container');
var editChargeModalClose = document.querySelector('.edit-common-modal-close-button');

editChargeModalClose.addEventListener('click', function (e) {
    editChargeModalContainer.classList.remove('edit-common-modal-open');
});


// Lựa chọn các loại phi ở trong mục Tạo mới
const commonTypeListItem = document.querySelectorAll('.common-type-list-item');
const commonTypeList = document.querySelector('.common-type-list');
commonTypeListItem.forEach(type => type.addEventListener('click', function (e) {
    const liSelector = e.target.closest('li');
    const textSelector = liSelector.querySelector('span').textContent;
    const typeText = document.querySelector('.common-modal-type-body-text');
    typeText.textContent = textSelector;
    typeText.classList.add('text-active');
    commonTypeList.classList.add('hidden');
    setTimeout(() => {
        commonTypeList.classList.remove('hidden');
    }, 100);
}));

// Lựa chọn các loại phi ở trong mục Chỉnh sửa
const editCommonTypeListItem = document.querySelectorAll('.edit-common-type-list-item');
const editCommonTypeList = document.querySelector('.edit-common-type-list');
editCommonTypeListItem.forEach(type => type.addEventListener('click', function (e) {
    const liSelector = e.target.closest('li');
    const textSelector = liSelector.querySelector('span').textContent;
    const typeText = document.querySelector('.edit-common-modal-type-body-text');
    typeText.textContent = textSelector;
    typeText.classList.add('text-active');
    editCommonTypeList.classList.add('hidden');
    setTimeout(() => {
        editCommonTypeList.classList.remove('hidden');
    }, 100);
}));

// Tạo mới Phí
function createNewCharges(data, callback = () => { }) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(commonApi, options)
        .then(function (response) {
            if (!response.ok) {
                console.log('Dữ liệu của throww:', response);
                console.error("Error fetching charges:", response.status);
                throw new Error("Failed to fetch charges: " + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            code = data.code;
            callback(data);
        })
        .catch(function (error) {
            console.error("Fetch error:", error.message);
            alert("Không thể tải dữ liệu: " + error.message);
        });
}

function handleCreateNewCharges() {
    const saveButtonClick = document.querySelector('.common-modal-save-button');
    const chargeInputContainer = document.querySelector('.common-modal-container');
    // console.log(saveButtonClick, chargeInputContainer);
    saveButtonClick.addEventListener('click', function (e) {
        let chargeNameInput = chargeInputContainer.querySelector('input[name="commonChargeName"]').value;
        let chargeTypeInput = commonCharges[chargeInputContainer.querySelector('.common-modal-type-body-text').textContent.trim()];
        let chargeUnitAmountInput = chargeInputContainer.querySelector('input[name="commonUnitAmount"]').value;
        let chargeUnitMeasurementInput = chargeInputContainer.querySelector('input[name="commonUnitMeasurement"]').value;
        let chargeDescriptionInput = chargeInputContainer.querySelector('input[name="commonDescription"]').value;
        var newCharge = {
            chargeName: chargeNameInput,
            type: chargeTypeInput,
            unitAmount: chargeUnitAmountInput,
            unitMeasurement: chargeUnitMeasurementInput,
            description: chargeDescriptionInput
        };
        // console.log(newCharge);
        createNewCharges(newCharge, function (response) {
            if (response.code === 200) {
                console.log('Dữ liệu phản hồi: ', response);
                listCommons.push(response.result);
                // console.log(listCommons);
                renderCommons([response.result]);
                renderServiceChargesForCreateModal([response.result]);
                renderTypes([response.result]);
                addClickForChargeDiv(document.getElementById('charge-' + response.result.id));
            } else {
                alert("Lỗi: Không thể thêm căn hộ. Vui lòng điền đầy đủ thông tin!");
            }
            chargeInputContainer.querySelector('input[name="commonChargeName"]').value = "";
            chargeInputContainer.querySelector('.common-modal-type-body-text').textContent = "";
            chargeInputContainer.querySelector('input[name="commonUnitAmount"]').value = "";
            chargeInputContainer.querySelector('input[name="commonUnitMeasurement"]').value = "";
            chargeInputContainer.querySelector('input[name="commonDescription"]').value = "";
        });
    });
}

// Xóa dữ liệu
function handleDeleteCharge(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    }
    fetch(commonApi + '/' + id, options)
        .then(function (response) {
            if (!response.ok) {
                console.error("Error deleting charge:", response.status);
                throw new Error("Failed to delete charge: " + response.statusText);
            }
            return response.json();
        })
        .then(function () {
            let chargeSelect = document.getElementById('charge-' + id);
            // console.log(chargeSelect);
            if (chargeSelect) {
                // console.log('Đã xóa thành công');
                console.log('danh sách: ', listCommons);
                let listServices = document.querySelector('.table-charges-list tbody');
                listServices.innerHTML = '';
                getServices(renderServiceChargesForCreateModal);
                let chargeFilterSelect = document.querySelectorAll('.type-list-item-' + id);
                console.log('danh sách item:', chargeFilterSelect);
                chargeFilterSelect.forEach(function (charge) {
                    charge.remove();
                });
                chargeSelect.remove();
            }
        })
}

// Cập nhật dữ liệu
function updateCharge(id, data, callback) {
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(commonApi + '/' + id, options)
        .then(function (response) {
            console.log(commonApi + '/' + id, response);
            if (!response.ok) {
                console.error("Error updating charge:", response.status);
                throw new Error("Failed to update charge: " + response.statusText);
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
            alert("Lỗi: Không thể cập nhật phí: " + error.message);
        });
}

function addClickForChargeDiv(divSelect) {
    divSelect.addEventListener('click', function (e) {
        if (e.target.classList.contains('charge-item-icon') || e.target.tagName === 'path') {
            return;
        }
        handleUpdateCharge(e.target.closest('div').id.slice(7));
    });
};
function handleUpdateCharge(id) {
    editChargeModalContainer.classList.add('edit-common-modal-open');
    let listAtrributes = listCommons.find(function (cur) {
        return cur.id === id;
    })
    // console.log(listAtrributes);
    editChargeModalContainer.querySelector('input[name="editCommonChargeName"]').value = listAtrributes.chargeName;
    editChargeModalContainer.querySelector('input[name="editCommonUnitAmount"]').value = listAtrributes.unitAmount;
    editChargeModalContainer.querySelector('input[name="editCommonUnitMeasurement"]').value = listAtrributes.unitMeasurement;
    editChargeModalContainer.querySelector('input[name="editCommonDescription"]').value = listAtrributes.description;
    let typeText = editChargeModalContainer.querySelector('.edit-common-modal-type-body-text');
    typeText.textContent = listChargeTypes[listAtrributes.type];
    typeText.classList.add('text-active');
    let editChargeModalSave = document.querySelector('.edit-common-modal-save-button');

    editChargeModalSave.onclick = function (e) {
        editChargeModalContainer.classList.remove('edit-common-modal-open');
        let chargeNameInput = editChargeModalContainer.querySelector('input[name="editCommonChargeName"]').value;
        let chargeTypeInput = commonCharges[editChargeModalContainer.querySelector('.edit-common-modal-type-body-text').textContent.trim()];
        let chargeUnitAmountInput = editChargeModalContainer.querySelector('input[name="editCommonUnitAmount"]').value;
        let chargeUnitMeasurementInput = editChargeModalContainer.querySelector('input[name="editCommonUnitMeasurement"]').value;
        let chargeDescriptionInput = editChargeModalContainer.querySelector('input[name="editCommonDescription"]').value;
        var editedCharge = {
            chargeName: chargeNameInput,
            type: chargeTypeInput,
            unitAmount: chargeUnitAmountInput,
            unitMeasurement: chargeUnitMeasurementInput,
            description: chargeDescriptionInput
        };
        updateCharge(id, editedCharge, function (response) {
            console.log('phản hồi:', response.code, response);
            if (response.code === 200) {
                listAtrributes.chargeName = chargeNameInput;
                listAtrributes.type = chargeTypeInput;
                listAtrributes.unitAmount = chargeUnitAmountInput;
                listAtrributes.unitMeasurement = chargeUnitMeasurementInput;
                listAtrributes.description = chargeDescriptionInput;
                let chargeEditedTable = document.getElementById('charge-' + id);
                chargeEditedTable.querySelector('.charge-item-text').textContent = chargeNameInput;
                let chargeContainer = document.querySelector('.charge-container');
                let serviceContainer = chargeContainer.querySelector('.service-charge-body');
                let managementContainer = chargeContainer.querySelector('.management-charge-body');
                let donationContainer = chargeContainer.querySelector('.donation-charge-body');
                if (serviceContainer.hasChildNodes()) serviceContainer.innerHTML = "";
                if (managementContainer.hasChildNodes()) managementContainer.innerHTML = "";
                if (donationContainer.hasChildNodes()) donationContainer.innerHTML = "";
                getCommons(renderCommons(listCommons));
                console.log('danh sách phí:', listDonationType, listCommons);
                let donationTypeContainer = document.querySelector('.donation-type-list');
                let donationTypeContainer2 = document.querySelector('.donation-input-type-list');
                let typeInitial = `
                    <li name="donation-all-type" class="donation-type-list-item">
                        <span> Tất cả </span>
                    </li>`;
                donationTypeContainer.innerHTML = typeInitial;
                donationTypeContainer2.innerHTML = "";
                renderTypes(listCommons);
                /*let idChargeList = listDonationType.map(function (charge) {
                    return charge.id;
                });
                if (idChargeList.includes(response.result.id) === false) ;*/
                addClickForChargeDiv(document.getElementById('charge-' + response.result.id));
            } else {
                alert("Cập nhật thất bại: " + response.message);
            }
        })
    };
}

// Xuất dữ liệu
var commonApi = "http://localhost:8080/project/charge";
var listCommons = [];
var code = 0;
function start() {
    getCommons(renderCommons);
    handleCreateNewCharges();
    // console.log('chạy thành công');
}

start();

function getCommons(callback = () => { }) {
    fetch(commonApi)
        .then(function (response) {
            if (!response.ok) {
                console.error("Error fetching common charges:", response.status);
                throw new Error("Failed to fetch common charges: " + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            if (data.code === 200) {
                listCommons = data.result;
                // console.log(listCommons);
                callback(listCommons);
            }
        })
        .catch(function (error) {
            console.error("Fetch error:", error.message);
            alert("Không thể tải dữ liệu: " + error.message);
        });
}

var commonCharges = {
    'Phí đóng góp, ủng hộ': 'DONATION',
    'Phí quản lý chung cư': 'MANAGEMENT',
    'Phí dịch vụ': 'SERVICE'
}
var listChargeTypes = {
    'DONATION': 'Phí đóng góp, ủng hộ',
    'MANAGEMENT': 'Phí quản lý chung cư',
    'SERVICE': 'Phí dịch vụ'
}

// Xuất dữ liệu
function renderCommons(commons) {
    if (!commons || !Array.isArray(commons)) {
        console.warn("Invalid apartment data:", commons);
        return;
    }
    var chargeContainer = document.querySelector('.charge-container');
    var serviceContainer = chargeContainer.querySelector('.service-charge-body');
    var managementContainer = chargeContainer.querySelector('.management-charge-body');
    var donationContainer = chargeContainer.querySelector('.donation-charge-body');
    var htmlservice = commons.filter(function (comli) {
        return comli.type === "SERVICE";
    }).map(function (common) {
        return `
            <div class="charge-item" id="charge-${common.id}">
                <span class="charge-item-text"> ${common.chargeName} </span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                        width="24px" fill="#6c757d" class="charge-item-icon" onclick="handleDeleteCharge('${common.id}')">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
            </div>
        `;
    });
    var htmlmanagement = commons.filter(function (comli) {
        return comli.type === "MANAGEMENT";
    }).map(function (common) {
        return `
            <div class="charge-item" id="charge-${common.id}">
                <span class="charge-item-text"> ${common.chargeName} </span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                        width="24px" fill="#6c757d" class="charge-item-icon" onclick="handleDeleteCharge('${common.id}')">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
            </div>
        `;
    });
    var htmldonation = commons.filter(function (comli) {
        return comli.type === "DONATION";
    }).map(function (common) {
        return `
            <div class="charge-item" id="charge-${common.id}">
                <span class="charge-item-text"> ${common.chargeName} </span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                        width="24px" fill="#6c757d" class="charge-item-icon" onclick="handleDeleteCharge('${common.id}')">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>  
            </div>
        `;
    });
    serviceContainer.innerHTML += htmlservice.join('');
    managementContainer.innerHTML += htmlmanagement.join('');
    donationContainer.innerHTML += htmldonation.join('');
    document.querySelectorAll('.charge-container .charge-item').forEach(function (e) {
        addClickForChargeDiv(e);
    });
}
