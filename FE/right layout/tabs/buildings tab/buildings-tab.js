const modalOpen = document.querySelector('.buildings-tab-button');
const modalSave = document.querySelector('.buildings-modal-save-button');
const modalClose = document.querySelector('.buildings-modal-close-button');
const trgt = document.querySelector('.buildings-modal-container');
const edittrgt = document.querySelector('.edit-buildings-modal-container');
const editModalClose = document.querySelector('.edit-buildings-modal-close-button');
const editModalSave = document.querySelector('.edit-buildings-modal-save-button');
modalOpen.addEventListener('click', function (e) {
    trgt.classList.add('buildings-modal-open');
});
modalClose.addEventListener('click', function (e) {
    trgt.classList.remove('buildings-modal-open');
})
modalSave.addEventListener('click', function (e) {
    trgt.classList.remove('buildings-modal-open');
});

editModalClose.addEventListener('click', function (e) {
    edittrgt.classList.remove('edit-buildings-modal-open');
})
editModalSave.addEventListener('click', function (e) {
    edittrgt.classList.remove('edit-buildings-modal-open');
});

const apartmentApi = "http://localhost:8080/project/apartment";
var listApartments = [];
var code = 0;
function startApt() {
    getApartments(renderApartments);
    handleCreateNewApartment();
}
startApt();

function getApartments(callback = () => { }) {

    fetch(apartmentApi)
        .then(function (response) {
            if (!response.ok) {
                console.error("Error fetching apartments:", response.status);
                throw new Error("Failed to fetch apartments: " + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            if (data.code === 200) {
                listApartments = data.result;
                callback(listApartments);
            }
        })
        .catch(function (error) {
            console.error("Fetch error:", error.message);
            alert("Không thể tải dữ liệu: " + error.message);
        });
}

function createNewApartment(data, callback = () => { }) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(apartmentApi, options)
        .then(function (response) {
            if (!response.ok) {
                console.error("Error fetching apartments:", response.status);
                throw new Error("Failed to fetch apartments: " + response.statusText);
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

function handleCreateNewApartment() {
    let saveBtn = document.querySelector('.buildings-modal-save-button');
    saveBtn.addEventListener('click', function (e) {
        let apartmentName = document.querySelector('input[name="buildings-apartmentName"]').value;
        let floorNumber = document.querySelector('input[name="buildings-floorNumber"]').value;
        let apartmentNumber = document.querySelector('input[name="buildings-apartmentNumber"]').value;
        let area = document.querySelector('input[name="buildings-area"]').value;
        var newApartment = {
            apartmentName: apartmentName,
            floorNumber: floorNumber,
            apartmentNumber: apartmentNumber,
            area: area
        }
        createNewApartment(newApartment, function (response) {
            console.log(response);
            if (response.code === 200) {
                listApartments.push(response.result);
                renderApartments([response.result]);
                addClickForBuildingDiv(document.getElementById('apartment-' + response.result.id));
            } else {
                alert("Lỗi: Không thể thêm căn hộ. Vui lòng điền đầy đủ thông tin!");
            }
            document.querySelector('input[name="buildings-apartmentName"]').value = "";
            document.querySelector('input[name="buildings-floorNumber"]').value = "";
            document.querySelector('input[name="buildings-apartmentNumber"]').value = "";
            document.querySelector('input[name="buildings-area"]').value = "";
        });
    })
}

function handleDeleteApartment(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(apartmentApi + '/' + id, options)
        .then(function (response) {
            console.log(response);
            if (!response.ok) {
                console.error("Error fetching apartments:", response.status);
                throw new Error("Failed to fetch apartments: " + response.statusText);
            }
            return response.json();
        })
        .then(function () {
            let apartmentSelect = document.getElementById('apartment-' + id);
            console.log(apartmentSelect);
            if (apartmentSelect) {
                apartmentSelect.remove();
            }
        });

}
function updateApartment(id, data, callback) {
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(apartmentApi + '/' + id, options)
        .then(function (response) {
            console.log(data);
            if (!response.ok) {
                throw new Error("Failed to update apartment: " + response.statusText);
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
            alert("Lỗi: Không thể cập nhật căn hộ: " + error.message);
        });
}
function handleUpdateApartment(id) {
    edittrgt.classList.add('edit-buildings-modal-open');
    apartmentSelect = document.getElementById(`apartment-${id}`);
    document.querySelector('input[name="edit-buildings-apartmentName"]').value = apartmentSelect.querySelector('.row-apartment-name').textContent.trim();
    document.querySelector('input[name="edit-buildings-floorNumber"]').value = apartmentSelect.querySelector('.row-floor-number').textContent.trim();
    document.querySelector('input[name="edit-buildings-apartmentNumber"]').value = apartmentSelect.querySelector('.row-apartment-number').textContent.trim();
    document.querySelector('input[name="edit-buildings-area"]').value = apartmentSelect.querySelector('.row-apartment-area').textContent.trim();

    let editBtn = document.querySelector('.edit-buildings-modal-save-button');
    editBtn.onclick = function () {
        let apartmentName = document.querySelector('input[name="edit-buildings-apartmentName"]').value;
        let floorNumber = document.querySelector('input[name="edit-buildings-floorNumber"]').value;
        let apartmentNumber = document.querySelector('input[name="edit-buildings-apartmentNumber"]').value;
        let area = document.querySelector('input[name="edit-buildings-area"]').value;
        var editedApartment = {
            apartmentName: apartmentName,
            floorNumber: floorNumber,
            apartmentNumber: apartmentNumber,
            area: area
        }

        updateApartment(id, editedApartment, function (response) {
            console.log(response);
            if (response.code === 200) {
                apartmentSelect.querySelector('.row-apartment-name').textContent = apartmentName;
                apartmentSelect.querySelector('.row-floor-number').textContent = floorNumber;
                apartmentSelect.querySelector('.row-apartment-number').textContent = apartmentNumber;
                apartmentSelect.querySelector('.row-apartment-area').textContent = area;
                addClickForBuildingDiv(document.getElementById('apartment-' + response.result.id));
            } else {
                alert("Lỗi: Không thể thêm căn hộ. Vui lòng điền đầy đủ thông tin!");
            }

        })
        console.log(listApartments);
    }
}

var apartmentStatus = {
    'AVAILABLE': 'Đang trống',
    'OCCUPIED': 'Đang sở hữu'
}

var apartmentStatusColor = {
    'AVAILABLE': 'style="color: #bc4749; font-weight: bold;"',
    'OCCUPIED': 'style="color: #40916c;font-weight: bold;"'
}
function renderApartments(apartments) {
    if (!apartments || !Array.isArray(apartments)) {
        console.warn("Invalid apartment data:", apartments);
        return;
    }
    var listApartment = document.querySelector('.buildings-table tbody');
    var htmls = apartments.map(function (apartment) {
        return `
            <tr class="table-row" id="apartment-${apartment.id}">
                <td class="row-apartment-name"> ${apartment.apartmentName} </td>
                <td class="row-floor-number"> ${apartment.floorNumber} </td>
                <td class="row-apartment-number"> ${apartment.apartmentNumber} </td>
                <td class="row-apartment-area"> ${apartment.area} </td>
                <td ${apartmentStatusColor[apartment.status]} class="row-apartment-status"> ${apartmentStatus[apartment.status]} </td>
                <td class="table-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                        width="24px" fill="#6c757d" class="table-icon" onclick="handleUpdateApartment('${apartment.id}')">
                        <path
                            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                        width="24px" fill="#6c757d" class="table-icon" onclick="handleDeleteApartment('${apartment.id}')">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                </td>
            </tr>
            `;
    });
    listApartment.innerHTML += htmls.join('');
    console.log(listApartments);
    document.querySelectorAll('.buildings-table .table-row').forEach(function (e) {
        addClickForBuildingDiv(e);
    });
}

// Hiển thị thành viên trong căn hộ

function addClickForBuildingDiv(divSelect) {
    divSelect.addEventListener('click', function (e) {
        if (e.target.classList.contains('table-icon') || e.target.tagName === 'path') {
            return;
        }
        let membersContainer = document.querySelector('.buildings-modal-apartment-members-container');
        membersContainer.classList.add('buildings-modal-apartment-members-open');
        let membersButton = membersContainer.querySelector('.buildings-modal-apartment-members-button');
        membersButton.addEventListener('click', function () {
            membersContainer.classList.remove('buildings-modal-apartment-members-open');
        });
        let selectApartmentId = divSelect.id.slice(10);
        let apartmentListMembers = listResidents.filter(function (member) {
            return member.apartmentId === selectApartmentId;
        });
        let selectAparmentOwner = apartmentListMembers.find(function (member) {
            return member.role === 'OWNER';
        });
        let selectApartmentNonOwner = apartmentListMembers.filter(function (member) {
            return member.role === 'NON_OWNER';
        });
        let ownerArea = membersContainer.querySelector('.apartment-members-infor .apartment-owner tbody');
        ownerArea.innerHTML = '';
        let ownerInfor = document.createElement('tr');
        ownerInfor.innerHTML = `
            <td>${selectAparmentOwner.residentName}</td>
            <td>${selectAparmentOwner.birthday}</td>
            <td>${residentGenders[selectAparmentOwner.gender]}</td>
            <td>${selectAparmentOwner.phoneNumber}</td>
            <td>${selectAparmentOwner.identityNumber}</td>
        `;
        ownerArea.appendChild(ownerInfor);

        let membersArea = membersContainer.querySelector('.apartment-members-infor .apartment-members tbody');
        membersArea.innerHTML = '';
        selectApartmentNonOwner.forEach(function (person) {
            let memberInfor = document.createElement('tr');
            memberInfor.innerHTML = `
                <td>${person.residentName}</td>
                <td>${person.birthday}</td>
                <td>${residentGenders[person.gender]}</td>
                <td>${person.phoneNumber}</td>
                <td>${person.identityNumber}</td>
                `;
            membersArea.appendChild(memberInfor);
        });
    });
};
