// Đóng mở mục đăng ký tạm trú
const tmpReigisModalOpen = document.querySelector('.resident-tab-tmp-regis-btn');
const tmpReigisModalSave = document.querySelector('.resident-tmp-regis-modal-save-button');
const tmpReigisModalClose = document.querySelector('.resident-tmp-regis-modal-close-button');
const tmpReigisContainer = document.querySelector('.resident-tmp-regis-modal-comtainer'); tmpReigisModalOpen.addEventListener('click', function (e) {
    tmpReigisContainer.classList.add('resident-tmp-regis-modal-open');
});
tmpReigisModalClose.addEventListener('click', function (e) {
    tmpReigisContainer.classList.remove('resident-tmp-regis-modal-open');
})
tmpReigisModalSave.addEventListener('click', function (e) {
    tmpReigisContainer.classList.remove('resident-tmp-regis-modal-open');
});

// Đóng mở mục đăng ký tạm vắng
const tmpAbsenceModalOpen = document.querySelector('.resident-tab-tmp-absence-btn');
const tmpAbsenceModalSave = document.querySelector('.resident-tmp-absence-modal-save-button');
const tmpAbsenceModalClose = document.querySelector('.resident-tmp-absence-modal-close-button');
const tmpAbsenceContainer = document.querySelector('.resident-tmp-absence-modal-comtainer');
tmpAbsenceModalOpen.addEventListener('click', function (e) {
    tmpAbsenceContainer.classList.add('resident-tmp-absence-modal-open');
});
tmpAbsenceModalClose.addEventListener('click', function (e) {
    tmpAbsenceContainer.classList.remove('resident-tmp-absence-modal-open');
})
tmpAbsenceModalSave.addEventListener('click', function (e) {
    tmpAbsenceContainer.classList.remove('resident-tmp-absence-modal-open');
    let residentDeathValue = document.querySelector('.resident-tmp-absence input');
    residentDeathValue.value = Number(residentDeathValue.value || 0) + 1;
});

// Đóng mở mục khai tử
const deathModalOpen = document.querySelector('.resident-tab-death-btn');
const deathModalSave = document.querySelector('.resident-death-modal-save-button');
const deathModalClose = document.querySelector('.resident-death-modal-close-button');
const deathContainer = document.querySelector('.resident-death-modal-container');
deathModalOpen.addEventListener('click', function (e) {
    deathContainer.classList.add('resident-death-modal-open');
});
deathModalClose.addEventListener('click', function (e) {
    deathContainer.classList.remove('resident-death-modal-open');
})
deathModalSave.addEventListener('click', function (e) {
    deathContainer.classList.remove('resident-death-modal-open');
    let residentDeathValue = document.querySelector('.resident-death input');
    residentDeathValue.value = Number(residentDeathValue.value || 0) + 1;
});

// Đóng mở mục tạo mới nhân khẩu
const createModalOpen = document.querySelector('.resident-tab-create-btn');
const createModalSave = document.querySelector('.create-resident-modal-save-button');
const createModalClose = document.querySelector('.create-resident-modal-close-button');
const createContainer = document.querySelector('.create-resident-modal-container');
createModalOpen.addEventListener('click', function (e) {
    createContainer.classList.add('create-resident-modal-open');
});
createModalClose.addEventListener('click', function (e) {
    createContainer.classList.remove('create-resident-modal-open');
})
createModalSave.addEventListener('click', function (e) {
    createContainer.classList.remove('create-resident-modal-open');
});
// Đóng mở mục chỉnh sửa
const editResidentModalSave = document.querySelector('.edit-resident-modal-save-button');
const editResidentModalClose = document.querySelector('.edit-resident-modal-close-button');
const editResidentContainer = document.querySelector('.edit-resident-modal-container');
editResidentModalClose.addEventListener('click', function (e) {
    editResidentContainer.classList.remove('edit-resident-modal-open');
})
// Điền giới tính
const sexSelect = document.querySelectorAll('.resident-input-sex-list-item');
sexSelect.forEach(sex => sex.addEventListener('click', function (e) {
    const liSelect = e.target.closest('li');
    const ulSelect = liSelect.closest('ul');
    const divSelect = ulSelect.closest('div');
    const textSelect = liSelect.querySelector('span').textContent;
    const inputSex = divSelect.querySelector('.resident-input-sex-text');
    inputSex.textContent = textSelect;
    ulSelect.classList.add('hidden');
    setTimeout(() => {
        ulSelect.classList.remove('hidden');
    }, 100);
}));

// Điền vai trò trong căn hộ
const roleSelect = document.querySelectorAll('.resident-input-apartment-role-list-item');
roleSelect.forEach(role => role.addEventListener('click', function (e) {
    const liSelect = e.target.closest('li');
    const ulSelect = liSelect.closest('ul');
    const divSelect = ulSelect.closest('div');
    const textSelect = liSelect.querySelector('span').textContent;
    const inputSex = divSelect.querySelector('.resident-input-apartment-role-text');
    inputSex.textContent = textSelect;
    ulSelect.classList.add('hidden');
    setTimeout(() => {
        ulSelect.classList.remove('hidden');
    }, 100);
}));

// Xuất dữ liệu
const residentApi = "http://localhost:8080/project/resident";
var listResidents = [];
var listResidentsValue = [];
var code = 0;
function start() {
    getResidents(renderResidents);
    handleCreateNewResident();
    document.querySelector('.number-of-resident input').value = listResidents.length;
    document.querySelector('.resident-tmp-absence input').value = 0;
    document.querySelector('.resident-death input').value = 0;
}
start();
function getResidents(callback = () => { }) {
    fetch(residentApi)
        .then(function (response) {
            if (!response.ok) {
                console.error("Error fetching apartments:", response.status);
                throw new Error("Dữ liệu dân cư chưa được tải");
            }
            return response.json();
        })
        .then(function (data) {
            if (data.code === 200) {
                listResidents = data.result;
                document.querySelector('.number-of-resident input').value = listResidents.length;
                callback(listResidents);
            }
        })
        .catch(function (error) {
            console.error("Fetch error:", error.message);
            alert(error.message);
        });
}

// Thêm mới nhân khẩu
function createNewResident(data, callback = () => { }) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(residentApi, options)
        .then(function (response) {
            if (!response.ok) {
                console.log('Dữ liệu của throww:', response);
                console.error("Error fetching residents:", response.status);
                throw new Error("Dữ liệu dân cư chưa đúng yêu cầu");
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

function handleCreateNewResident() {
    let saveBtn = document.querySelector('.create-resident-modal-save-button');
    saveBtn.addEventListener('click', function (e) {
        let residentNameInput = createContainer.querySelector('input[name="residentResidentName"]').value;
        let birthdayInput = createContainer.querySelector('input[name="residentBirthday"]').value;
        let placeOfBirthInput = createContainer.querySelector('input[name="residentPlaceOfBirth"]').value;
        let ethnicityInput = createContainer.querySelector('input[name="residentEthnicity"]').value;
        let nationalityInput = createContainer.querySelector('input[name="residentNationality"]').value;
        let identityNumberInput = createContainer.querySelector('input[name="residentIdentityNumber"]').value;
        let permaAddressInput = createContainer.querySelector('input[name="residentPermanentAddress"]').value;
        let educationLevelInput = createContainer.querySelector('input[name="residentEducationLevel"]').value;
        let languageProficiencyInput = createContainer.querySelector('input[name="residentLanguageProficiency"]').value;
        let occupationInput = createContainer.querySelector('input[name="residentOccupation"]').value;
        let apartmentNameInput = createContainer.querySelector('input[name="residentApartmentName"]').value;
        let apartmentId = listApartments.find(function (resident, index) {
            return resident.apartmentName === apartmentNameInput;
        }).id;
        let aliasNameInput = createContainer.querySelector('input[name="residentAliasName"]').value;
        let hometownInput = createContainer.querySelector('input[name="residentHometown"]').value;
        let religionInput = createContainer.querySelector('input[name="residentReligion"]').value;
        let phoneInput = createContainer.querySelector('input[name="residentPhoneNumber"]').value;
        let passportNumberInput = createContainer.querySelector('input[name="residentPassportNumber"]').value;
        let temporaryAddressInput = createContainer.querySelector('input[name="residentTemporaryAddress"]').value;
        let professionalQualification = createContainer.querySelector('input[name="residentProfessionalQualification"]').value;
        let ethnicLanguageInput = createContainer.querySelector('input[name="residentEthnicLanguage"]').value;
        let workplaceInput = createContainer.querySelector('input[name="residentWorkplace"]').value;
        let roleInput = residentRolesVN[createContainer.querySelector('.resident-input-apartment-role-text').textContent.trim()];
        let genderInput = residentGenders2[createContainer.querySelector('.resident-input-sex-text').textContent.trim()];

        var newResident = {
            residentName: residentNameInput,
            birthday: birthdayInput,
            placeOfBirth: placeOfBirthInput,
            ethnicity: ethnicityInput,
            nationality: nationalityInput,
            identityNumber: identityNumberInput,
            permanentAddress: permaAddressInput,
            educationLevel: educationLevelInput,
            languageProficiency: languageProficiencyInput,
            occupation: occupationInput,
            apartmentId: apartmentId,
            aliasName: aliasNameInput,
            hometown: hometownInput,
            religion: religionInput,
            phoneNumber: phoneInput,
            passportNumber: passportNumberInput,
            temporaryAddress: temporaryAddressInput,
            professionalQualification: professionalQualification,
            ethnicLanguage: ethnicLanguageInput,
            workplace: workplaceInput,
            role: roleInput,
            gender: genderInput
        }
        console.log('Dữ liệu đầu vào: ', newResident);
        createNewResident(newResident, function (response) {
            if (response.code === 200) {
                console.log('Dữ liệu phản hồi: ', response);
                listResidents.push(response.result);
                // listResidentsValue.push(newResidentValue);
                renderResidents([response.result]);
                if (response.result.role === "OWNER") {
                    var updateApart = {};
                    let apartmentSelect = listApartments.forEach(function (apart) {
                        if (apart.id === response.result.apartmentId) {
                            updateApart = {
                                apartmentName: apart.apartmentName,
                                floorNumber: apart.floorNumber,
                                apartmentNumber: apart.apartmentNumber,
                                area: apart.area,
                                status: "OCCUPIED",
                                ownerId: response.result.id,
                            }
                        }
                    });
                    updateApartment(response.result.apartmentId, updateApart, function (rp) {
                        console.log(rp);
                        if (rp.code === 200) {
                            apartmentSelect = document.getElementById(`apartment-${response.result.apartmentId}`);
                            apartmentSelect.querySelector('.row-apartment-name').textContent = updateApart.apartmentName;
                            apartmentSelect.querySelector('.row-floor-number').textContent = updateApart.floorNumber;
                            apartmentSelect.querySelector('.row-apartment-number').textContent = updateApart.apartmentNumber;
                            apartmentSelect.querySelector('.row-apartment-area').textContent = updateApart.area;
                            let listApartment = document.querySelector('.buildings-table tbody');
                            listApartment.innerHTML = '';
                            getApartments(renderApartments);
                        } else {
                            alert("Vui lòng điền đầy đủ thông tin!");
                        }

                    })
                }
                let ressidentValue = document.querySelector('.number-of-resident input');
                ressidentValue.value = Number(ressidentValue.value) + 1;
            } else {
                alert("Vui lòng điền đầy đủ thông tin!");
            }
        });
        createContainer.querySelectorAll('input').forEach(function (ip) {
            if (ip.value) ip.value = "";
        });
        createContainer.querySelectorAll('.resident-input-sex-text').forEach(function (text) {
            text.textContent = "";
        });
        createContainer.querySelector('.resident-input-apartment-role-text').textContent = "";
    })
}

// Xóa nhân khẩu
function handleDeleteResident(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(residentApi + '/' + id, options)
        .then(function (response) {
            if (!response.ok) {
                console.error("Error fetching apartments:", response.status);
                throw new Error("Failed to fetch apartments: " + response.statusText);
            }
            return response.json();
        })
        .then(function () {
            let residentSelect = document.getElementById('resident-' + id);
            if (residentSelect) {
                if (residentSelect.querySelector('.resident-role').getAttribute('name') === "OWNER") {
                    let aptId = listApartments.find(function (e) {
                        return residentSelect.querySelector('.resident-apartment-name').textContent.trim() === e.apartmentName;
                    }).id;
                    var updateApart = {};
                    let apartmentSelect = listApartments.forEach(function (apart) {
                        if (apart.id === aptId) {
                            updateApart = {
                                apartmentName: apart.apartmentName,
                                floorNumber: apart.floorNumber,
                                apartmentNumber: apart.apartmentNumber,
                                area: apart.area,
                                status: "AVAILABLE",
                                ownerId: '',
                            }
                        }
                    });
                    updateApartment(aptId, updateApart, function (response) {
                        console.log(response);
                        if (response.code === 200) {
                            apartmentSelect = document.getElementById(`apartment-${aptId}`);
                            apartmentSelect.querySelector('.row-apartment-name').textContent = updateApart.apartmentName;
                            apartmentSelect.querySelector('.row-floor-number').textContent = updateApart.floorNumber;
                            apartmentSelect.querySelector('.row-apartment-number').textContent = updateApart.apartmentNumber;
                            apartmentSelect.querySelector('.row-apartment-area').textContent = updateApart.area;
                            let listApartment = document.querySelector('.buildings-table tbody');
                            listApartment.innerHTML = '';
                            getApartments(renderApartments);

                        } else {
                            alert("Lỗi: Không thể thêm căn hộ. Vui lòng điền đầy đủ thông tin!");
                        }
                    })
                }
                let ressidentValue = document.querySelector('.number-of-resident input');
                ressidentValue.value = Number(ressidentValue.value) - 1;
                residentSelect.remove();
            }
        });

}

// Cập nhật thông tin nhân khẩu
function updateResident(id, data, callback) {
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(residentApi + '/' + id, options)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Dữ liệu cập nhật chưa đúng yêu cầu");
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
            alert(error.message);
        });
}

function updateAction(id) {
    editResidentContainer.classList.remove('edit-resident-modal-open');
    console.log('đã click', id);
    let residentNameInput = editResidentContainer.querySelector('input[name="residentResidentName"]').value;
    let birthdayInput = editResidentContainer.querySelector('input[name="residentBirthday"]').value;
    let placeOfBirthInput = editResidentContainer.querySelector('input[name="residentPlaceOfBirth"]').value;
    let ethnicityInput = editResidentContainer.querySelector('input[name="residentEthnicity"]').value;
    let nationalityInput = editResidentContainer.querySelector('input[name="residentNationality"]').value;
    let identityNumberInput = editResidentContainer.querySelector('input[name="residentIdentityNumber"]').value;
    let permaAddressInput = editResidentContainer.querySelector('input[name="residentPermanentAddress"]').value;
    let educationLevelInput = editResidentContainer.querySelector('input[name="residentEducationLevel"]').value;
    let languageProficiencyInput = editResidentContainer.querySelector('input[name="residentLanguageProficiency"]').value;
    let occupationInput = editResidentContainer.querySelector('input[name="residentOccupation"]').value;
    let apartmentNameInput = editResidentContainer.querySelector('input[name="residentApartmentName"]').value;
    let apartmentIdInput = listApartments.find(function (resident, index) {
        return resident.apartmentName === apartmentNameInput;
    }).id;
    let aliasNameInput = editResidentContainer.querySelector('input[name="residentAliasName"]').value;
    let hometownInput = editResidentContainer.querySelector('input[name="residentHometown"]').value;
    let religionInput = editResidentContainer.querySelector('input[name="residentReligion"]').value;
    let phoneInput = editResidentContainer.querySelector('input[name="residentPhoneNumber"]').value;
    let passportNumberInput = editResidentContainer.querySelector('input[name="residentPassportNumber"]').value;
    let temporaryAddressInput = editResidentContainer.querySelector('input[name="residentTemporaryAddress"]').value;
    let professionalQualification = editResidentContainer.querySelector('input[name="residentProfessionalQualification"]').value;
    let ethnicLanguageInput = editResidentContainer.querySelector('input[name="residentEthnicLanguage"]').value;
    let workplaceInput = editResidentContainer.querySelector('input[name="residentWorkplace"]').value;
    let roleInput = residentRolesVN[editResidentContainer.querySelector('.resident-input-apartment-role-text').textContent.trim()];
    let genderInput = residentGenders2[editResidentContainer.querySelector('.resident-input-sex-text').textContent.trim()];

    var editedResident = {
        residentName: residentNameInput,
        birthday: birthdayInput,
        placeOfBirth: placeOfBirthInput,
        ethnicity: ethnicityInput,
        nationality: nationalityInput,
        identityNumber: identityNumberInput,
        permanentAddress: permaAddressInput,
        educationLevel: educationLevelInput,
        languageProficiency: languageProficiencyInput,
        occupation: occupationInput,
        apartmentId: apartmentIdInput,
        aliasName: aliasNameInput,
        hometown: hometownInput,
        religion: religionInput,
        phoneNumber: phoneInput,
        passportNumber: passportNumberInput,
        temporaryAddress: temporaryAddressInput,
        professionalQualification: professionalQualification,
        ethnicLanguage: ethnicLanguageInput,
        workplace: workplaceInput,
        role: roleInput,
        gender: genderInput
    }
    updateResident(id, editedResident, function (response) {
        console.log('phản hồi:', response.code, response);
        if (response.code === 200) {
            let residentEditedTable = document.getElementById('resident-' + id);
            residentEditedTable.querySelector('.resident-apartment-name').textContent = response.result.apartmentName;
            residentEditedTable.querySelector('.resident-name').textContent = response.result.residentName;
            residentEditedTable.querySelector('.resident-role').textContent = residentRoles[response.result.role];
            residentEditedTable.querySelector('.resident-phone-number').textContent = response.result.phoneNumber;
            if (response.result.role === "OWNER") {
                var updateApart = {};
                let apartmentSelect = listApartments.forEach(function (apart) {
                    if (apart.id === response.result.apartmentId) {
                        updateApart = {
                            apartmentName: apart.apartmentName,
                            floorNumber: apart.floorNumber,
                            apartmentNumber: apart.apartmentNumber,
                            area: apart.area,
                            status: "OCCUPIED",
                            ownerId: response.result.id,
                        }
                    }
                });
                updateApartment(response.result.apartmentId, updateApart, function (rp) {
                    console.log(rp);
                    if (rp.code === 200) {
                        apartmentSelect = document.getElementById(`apartment-${response.result.apartmentId}`);
                        apartmentSelect.querySelector('.row-apartment-name').textContent = updateApart.apartmentName;
                        apartmentSelect.querySelector('.row-floor-number').textContent = updateApart.floorNumber;
                        apartmentSelect.querySelector('.row-apartment-number').textContent = updateApart.apartmentNumber;
                        apartmentSelect.querySelector('.row-apartment-area').textContent = updateApart.area;
                        let listApartment = document.querySelector('.buildings-table tbody');
                        listApartment.innerHTML = '';
                        getApartments(renderApartments);
                    } else {
                        alert("Vui lòng điền đầy đủ thông tin!");
                    }

                })
            }
            getResidents();
        } else {
            alert("Lỗi: Không thể thêm căn hộ. Vui lòng điền đầy đủ thông tin!");
        }
    })
}

function handleUpdateResident(id) {
    console.log('lần gọi hàm update');
    editResidentContainer.classList.add('edit-resident-modal-open');
    let listAtrributes = listResidents.find(function (cur) {
        return cur.id === id;
    })
    // console.log(listAtrributes);
    editResidentContainer.querySelector('input[name="residentResidentName"]').value = listAtrributes.residentName;
    editResidentContainer.querySelector('input[name="residentBirthday"]').value = listAtrributes.birthday;
    editResidentContainer.querySelector('input[name="residentPlaceOfBirth"]').value = listAtrributes.placeOfBirth;
    editResidentContainer.querySelector('input[name="residentEthnicity"]').value = listAtrributes.ethnicity;
    editResidentContainer.querySelector('input[name="residentNationality"]').value = listAtrributes.nationality;
    editResidentContainer.querySelector('input[name="residentIdentityNumber"]').value = listAtrributes.identityNumber;
    editResidentContainer.querySelector('input[name="residentPermanentAddress"]').value = listAtrributes.permaAddress;
    editResidentContainer.querySelector('input[name="residentEducationLevel"]').value = listAtrributes.educationLevel;
    editResidentContainer.querySelector('input[name="residentLanguageProficiency"]').value = listAtrributes.languageProficiency;
    editResidentContainer.querySelector('input[name="residentOccupation"]').value = listAtrributes.occupation;
    editResidentContainer.querySelector('input[name="residentApartmentName"]').value = listAtrributes.apartmentName;
    editResidentContainer.querySelector('input[name="residentAliasName"]').value = listAtrributes.aliasName;
    editResidentContainer.querySelector('input[name="residentHometown"]').value = listAtrributes.hometown;
    editResidentContainer.querySelector('input[name="residentReligion"]').value = listAtrributes.religion;
    editResidentContainer.querySelector('input[name="residentPhoneNumber"]').value = listAtrributes.phoneNumber;
    editResidentContainer.querySelector('input[name="residentPassportNumber"]').value = listAtrributes.passportNumber;
    editResidentContainer.querySelector('input[name="residentTemporaryAddress"]').value = listAtrributes.temporaryAddress;
    editResidentContainer.querySelector('input[name="residentProfessionalQualification"]').value = listAtrributes.professionalQualification;
    editResidentContainer.querySelector('input[name="residentEthnicLanguage"]').value = listAtrributes.ethnicLanguage;
    editResidentContainer.querySelector('input[name="residentWorkplace"]').value = listAtrributes.workplace;
    editResidentContainer.querySelector('.resident-input-apartment-role-text').textContent = residentRoles[listAtrributes.role];
    editResidentContainer.querySelector('.resident-input-sex-text').textContent = residentGenders[listAtrributes.gender];

    let editSaveButton = document.querySelector('.edit-resident-modal-save-button');
    // console.log(editSaveButton);
    function residentEventClick() {
        updateAction(id);
    }
    editSaveButton.onclick = residentEventClick;
}

// Xuất nhân khẩu
var residentRoles = {
    'OWNER': 'Chủ hộ',
    'NON_OWNER': 'Thành viên'
}

var residentRolesVN = {
    'Chủ hộ': 'OWNER',
    'Thành viên': 'NON_OWNER'
}

var residentGenders = {
    'MALE': 'Nam',
    'FEMALE': 'Nữ'
}
var residentGenders2 = {
    'Nam': 'MALE',
    'Nữ': 'FEMALE'
}
function renderResidents(residents) {
    if (!residents || !Array.isArray(residents)) {
        console.warn("Invalid apartment data:", residents);
        return;
    }
    var listResident = document.querySelector('.resident-table tbody');
    var htmls = residents.map(function (resident) {
        return `
            <tr class="table-row" id="resident-${resident.id}">
                <td class="resident-apartment-name"> ${resident.apartmentName}</td>
                <td class="resident-name"> ${resident.residentName}</td>
                <td class="resident-role" name="${resident.role}"> ${residentRoles[resident.role]}</td>
                <td class="resident-phone-number"> ${resident.phoneNumber}</td>
                <td class="table-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                        width="24px" fill="#6c757d" class="table-icon" onclick="handleUpdateResident('${resident.id}')">
                        <path
                            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                        width="24px" fill="#6c757d" class="table-icon" onclick="handleDeleteResident('${resident.id}')">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                </td>
            </tr>
            `;
    });
    listResident.innerHTML += htmls.join('');
    console.log(listResidents);
}

// tìm kiếm cư dân

function searchResidents(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(residentApi + '/filter', options)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Failed to search residents: " + response.statusText);
            }
            return response.json();
        })
        .then(function (dt) {
            if (dt.code === 200) {
                callback(dt);
            } else {
                alert("Không tìm thấy kết quả: " + data.message);
            }
        })
}

var searchResidentsButton = document.querySelector('.resident-tab-search-icon');

searchResidentsButton.addEventListener('click', handleSearchResidents);

function handleSearchResidents() {
    var searchInput = document.querySelector('input[name="residentSearchInput"]').value.trim();
    console.log('đang tìm kiếm', searchInput);
    var newString = {
        searchText: searchInput
    }
    searchResidents(newString, function (residents) {
        console.log('dữ liệu phản hồi:', residents);
        if (residents.code === 200) {
            let rowTableList = document.querySelectorAll('.resident-table tbody .table-row');
            rowTableList.forEach(row => {
                row.classList.add('table-row-hide');
                let idResident = row.id.slice(9);
                let idList = residents.result.map(function (val) {
                    return val.id;
                });
                //console.log(idList);
                if (idList.includes(idResident)) {
                    row.classList.remove('table-row-hide');
                }
            })
        }
        else {
            alert("Không có cư dân phù hợp. Vui lòng điền đầy đủ thông tin!");
        }
    });
}