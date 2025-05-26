// Đóng mở mục tạo mới
const serviceModalContainer = document.querySelector('.service-modal-container');
const serviceModalOpen = document.querySelector('.service-tab-button');
const serviceModalClose = document.querySelector('.service-modal-close-button');

serviceModalOpen.addEventListener('click', function (e) {
    serviceModalContainer.classList.add('service-modal-open');
});

serviceModalClose.addEventListener('click', function (e) {
    serviceModalContainer.classList.remove('service-modal-open');
});

// Đóng mở mục hóa đơn
const billModalContainer = document.querySelector('.bill-modal-container');
const billModalClose = document.querySelector('.bill-modal-close-button');
const billModalPrint = document.querySelector('.bill-modal-print-button');
billModalClose.addEventListener('click', function (e) {
    billModalContainer.classList.remove('bill-modal-open');
});
billModalPrint.addEventListener('click', function (e) {
    alert('Hiện tại tính năng "In hóa đơn" đang bị tạm khóa');
    console.log('In hóa đơn');
});
// Danh sách chọn phương thức thanh toán trong bảng tạo mới
const paymentMethodList = document.querySelectorAll('.service-payment-method-list-item');
paymentMethodList.forEach(method => method.addEventListener('click', function (e) {
    const liSelector = e.target.closest('li');
    const textSelector = liSelector.querySelector('span').textContent;
    const typeText = document.querySelector('input[name="servicePaymentMethod"]');
    typeText.value = textSelector;
    let paymentMethodListContainer = document.querySelector('.service-payment-method-list');
    paymentMethodListContainer.classList.add('hidden');
    setTimeout(() => {
        paymentMethodListContainer.classList.remove('hidden');
    }, 100);
}));

// Danh sách chọn phương thức thanh toán trong bảng chỉnh sửa
const editPaymentMethodList = document.querySelectorAll('.edit-service-payment-method-list-item');
editPaymentMethodList.forEach(method => method.addEventListener('click', function (e) {
    const liSelector = e.target.closest('li');
    const textSelector = liSelector.querySelector('span').textContent;
    const typeText = document.querySelector('input[name="editServicePaymentMethod"]');
    typeText.value = textSelector;
    let editPaymentMethodListContainer = document.querySelector('.edit-service-payment-method-list');
    editPaymentMethodListContainer.classList.add('hidden');
    setTimeout(() => {
        editPaymentMethodListContainer.classList.remove('hidden');
    }, 100);
}));

// filter lọc trạng thái thanh toán
const statusSelect = document.querySelectorAll('.service-status-list-item');
statusSelect.forEach(status => status.addEventListener('click', function (e) {
    const liSelector = e.target.closest('li');
    const textSelector = liSelector.querySelector('span').textContent;
    const inputStatus = document.querySelector('.service-tab-search-status-text');
    inputStatus.textContent = textSelector;
    let statusListContainer = document.querySelector('.service-status-list');
    inputStatus.classList.add('service-tab-search-status-active');
    statusListContainer.classList.add('hidden');
    let rowTableList = document.querySelectorAll('.service-table  tbody .table-row');
    rowTableList.forEach(row => {
        row.classList.add('table-row-hide');
        const nameRow = row.querySelector('.service-table-row-status').getAttribute('name');
        if (nameRow === liSelector.getAttribute('name') || liSelector.getAttribute('name') === 'all-status') {
            row.classList.remove('table-row-hide');
        }
    })
    setTimeout(() => {
        statusListContainer.classList.remove('hidden');
    }, 100);
}));

// Khởi tạo
var serviceApi = "http://localhost:8080/project/charge";
var billApi = "http://localhost:8080/project/bill";
var serviceChargeList = [];
var billList = [];
var statusListEN = {
    'PAID': 'Đã thanh toán',
    'PARTIAL': 'Đã thanh toán một phần',
    'UNPAID': 'Chưa thanh toán',
    'OVERDUE': 'Quá hạn'
}

var statusStyles = {
    'PAID': 'style="color:green; font-weight:bold;"',
    'PARTIAL': 'style="color:green;"',
    'UNPAID': 'style="color:red;"',
    'OVERDUE': 'style="color:red; font-weight:bold;"'
}
var code = 0;

function start() {
    getServices(renderServiceChargesForCreateModal);
    getBills(renderBills);
    handleCreateNewBill();
}
start();
// Lấy dữ liệu phí dịch vụ
function getServices(callback = () => { }) {
    fetch(serviceApi)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('HTTP error' + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            serviceChargeList = data.result.filter(function (e) {
                return e.type === "SERVICE";
            });
            console.log('Các phí dịch vụ:', serviceChargeList);
            callback(serviceChargeList);
        })
        .catch(function (error) {
            console.error("Fetch error:", error.message);
            alert("Không thể tải dữ liệu: " + error.message);
        });
}

// Lấy dữ liệu hóa đơn
function getBills(callback = () => { }) {
    fetch(billApi)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('HTTP error' + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            billList = data.result;
            callback(billList);
        })
        .catch(function (error) {
            console.error("Fetch error:", error.message);
            alert("Không thể tải dữ liệu: " + error.message);
        });
}

// Lấy dữ liệu các phí cho bảng tạo mới
function renderServiceChargesForCreateModal(serviceCharges) {
    const listServices = document.querySelector('.table-charges-list tbody');
    let listServicesHtml = serviceCharges.map(function (serviceCharge) {
        return `
        <tr class="table-row" id="${serviceCharge.id}">
            <td>${serviceCharge.chargeName}</td>
            <td> <input type="number" name="${serviceCharge.id}" class="inputInTable"> </td>
        </tr>
        `;
    })
    listServices.innerHTML += listServicesHtml.join('');
}

// Xuất dữ liệu
function renderBills(bills) {
    var listBills = document.querySelector('.service-table  tbody');
    var htmls = bills.map(function (bill) {
        return `
        <tr class="table-row" id="bill-${bill.id}">
            <td>${bill.apartmentName}</td>
            <td>${bill.monthYear}</td>
            <td>${bill.totalAmountPaid}</td>
            <td ${statusStyles[bill.status]} class="service-table-row-status" name="${bill.status}">${statusListEN[bill.status]}</td>
            <td>${nameMethodListEN[bill.paymentMethod]}</td>
            <td class="table-icons">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                    width="24px" fill="#6c757d" class="table-icon" onclick="handleUpdateBill('${bill.id}')">
                    <path
                        d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                    width="24px" fill="#6c757d" class="table-icon" onclick="handleDeleteBill('${bill.id}')">
                    <path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
            </td>
        </tr>
        `;
    });
    listBills.innerHTML += htmls.join('');
    document.querySelectorAll('.service-table .table-row').forEach(function (e) {
        addClickForRow(e);
    });
}


// Tạo một hóa đơn mới
function createNewBills(data, callback = () => { }) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(billApi, options)
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
function handleCreateNewBill() {
    billSaveButton = document.querySelector('.service-modal-save-button');
    billSaveButton.addEventListener('click', function (e) {
        serviceModalContainer.classList.remove('service-modal-open');
        let apartmentNameInput = document.querySelector('input[name="serviceApartmentName"]').value;
        let apartmentIdInput = listApartments.find(function (e) {
            return e.apartmentName === apartmentNameInput;
        })
        let monthYearInput = document.querySelector('input[name="serviceMonthYear"]').value;
        let paymentMethodInput = nameMethodListVN[document.querySelector('input[name="servicePaymentMethod"]').value.trim()];
        let listServiceChargesInput = [];
        document.querySelector('.table-charges-list').querySelectorAll('.table-row').forEach(function (val) {
            var x = {
                chargeId: val.id,
                unitQuantity: document.querySelector('input[name="' + val.id + '"]').value
            }
            listServiceChargesInput.push(x);
        });
        var newBill = {
            apartmentId: apartmentIdInput.id,
            apartmentChargeRequestList: listServiceChargesInput,
            monthYear: monthYearInput,
            paymentMethod: paymentMethodInput
        }
        console.log(newBill);
        createNewBills(newBill, function (response) {
            if (response.code === 200) {
                billList.push(response.result);
                renderBills([response.result]);
                addClickForRow(document.getElementById('bill-' + response.result.id));
            }
            else {
                alert("Lỗi: Không thể thêm căn hộ. Vui lòng điền đầy đủ thông tin!");
            }
            document.querySelectorAll('.service-modal input').forEach(function (e) {
                e.value = "";
            });
        })
    });
}

// Xóa một hóa đơn

function handleDeleteBill(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(billApi + '/' + id, options)
        .then(function (response) {
            if (!response.ok) {
                console.log('Dữ liệu của throw:', response);
                console.error("Error fetching charges:", response.status);
                throw new Error("Failed to fetch charges: " + response.statusText);
            }
            return response.json();
        })
        .then(function () {
            let billSelect = document.getElementById('bill-' + id);
            if (billSelect) {
                billSelect.remove();
            }
        })
}

// Cập nhật hóa đơn
function updateBill(id, data, callback) {
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(billApi + '/' + id, options)
        .then(function (response) {
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
function handleUpdateBill(id) {
    let editBillModalContainer = document.querySelector('.edit-service-modal-container');
    editBillModalContainer.classList.add('edit-service-modal-open');
    let editBillModalCloseButton = document.querySelector('.edit-service-modal-close-button');
    let editBillModalSaveButton = document.querySelector('.edit-service-modal-save-button');
    editBillModalCloseButton.addEventListener('click', function () {
        editBillModalContainer.classList.remove('edit-service-modal-open');
    });
    let listAttributes = billList.find(function (e) {
        return e.id === id;
    });
    document.querySelector('input[name="editServiceApartmentName"]').value = listAttributes.apartmentName;
    document.querySelector('input[name="editServiceMonthYear"]').value = listAttributes.monthYear;
    document.querySelector('input[name="editServiceAmountPaid"]').value = listAttributes.totalAmountPaid;
    document.querySelector('input[name="editServicePaymentMethod"]').value = nameMethodListEN[listAttributes.paymentMethod];
    let editTableSelect = document.querySelector('.edit-service-input-service-charges-list table tbody');
    editTableSelect.innerHTML = "";
    listAttributes.apartmentChargeList.forEach(function (val) {
        let row = document.createElement('tr');
        row.id = val.chargeId;
        row.classList.add('table-row');
        row.innerHTML = `
            <td>${val.chargeName}</td>
            <td> <input type="number" name="${val.chargeId}" class="inputInTable" value="${val.unitQuantity}"> </td>
        `;
        editTableSelect.appendChild(row);
    });
    editBillModalSaveButton.onclick = function () {
        editBillModalContainer.classList.remove('edit-service-modal-open');
        let apartmentNameInput = document.querySelector('input[name="editServiceApartmentName"]').value;
        let apartmentIdInput = listApartments.find(function (e) {
            return e.apartmentName === apartmentNameInput;
        }).id;
        let monthYearInput = document.querySelector('input[name="editServiceMonthYear"]').value;
        let totalAmountPaidInput = document.querySelector('input[name="editServiceAmountPaid"]').value;
        let paymentMethodInput = nameMethodListVN[document.querySelector('input[name="editServicePaymentMethod"]').value.trim()];
        let listServiceChargesInput = [];
        document.querySelector('.edit-service-input-service-charges-list table').querySelectorAll('.table-row').forEach(function (val) {
            var x = {
                chargeId: val.id,
                unitQuantity: document.querySelector('.edit-service-input-service-charges-list input[name="' + val.id + '"]').value
            }
            listServiceChargesInput.push(x);
        });
        var editedBill = {
            apartmentId: apartmentIdInput,
            apartmentChargeRequestList: listServiceChargesInput,
            monthYear: monthYearInput,
            totalAmountPaid: totalAmountPaidInput,
            paymentMethod: paymentMethodInput
        }
        console.log('dữ liệu gửi đi:', editedBill);
        updateBill(id, editedBill, function (response) {
            console.log('phản hồi:', response.code, response);
            if (response.code === 200) {
                let rowEditSelect = document.getElementById('bill-' + id);
                if (rowEditSelect) {
                    rowEditSelect.remove();
                    getBills(renderBills([response.result]));
                    console.log(response.result);
                    addClickForRow(document.getElementById('bill-' + response.result.id));
                }
            } else {
                alert("Cập nhật thất bại: " + response.message);
            }
        })
    };
}

// Hiển thị hóa đơn
function addClickForRow(row) {
    row.addEventListener('click', function (e) {
        if (e.target.classList.contains('table-icon') || e.target.tagName === 'path') {
            return;
        }
        billModalContainer.classList.add('bill-modal-open');
        //console.log(row, row.id.slice(5));
        let idRow = row.id.slice(5);
        let billAttributes = billList.find(function (e) {
            return e.id === idRow;
        });
        // console.log(row, billAttributes);
        document.querySelector('input[name="billPrintApartment"]').value = billAttributes.apartmentName;
        document.querySelector('input[name="billPrintDate"]').value = billAttributes.monthYear;
        document.querySelector('input[name="billPrintPaymentMethod"]').value = nameMethodListEN[billAttributes.paymentMethod];
        let tableSelect = document.querySelector('.bill-table-2 tbody');
        tableSelect.innerHTML = "";
        billAttributes.apartmentChargeList.forEach(function (val) {
            let rowTable2 = document.createElement('tr');
            rowTable2.innerHTML = `
                <td>${val.chargeName}</td>
                <td>${val.unitAmount} </td>
                <td>${val.unitMeasurement}</td>
                <td>${val.unitQuantity}</td>
                <td>${val.chargeAmount}</td>
            `;
            tableSelect.appendChild(rowTable2);
        });
        document.querySelector('input[name="billPrintTotalAmountPaid"]').value = billAttributes.totalAmountPaid;
        document.querySelector('input[name="billPrintTotalAmountDue"]').value = billAttributes.totalAmountDue
        document.querySelector('.bill-table-2 .billPrintTotalPaymentAmount').textContent = billAttributes.totalPaymentAmount;
        let dateStr = billAttributes.createAt.slice(0, 10);;
        let [year, month, day] = dateStr.split('-');
        let formattedDate = `${day} - ${month} - ${year}`;
        document.querySelector('.bill-header-right-side .day-month-year').textContent = formattedDate;
    })
}
