
function bindUserData() {
    const users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        document.querySelector('#tblbody').innerHTML = "";
        users.forEach(function (item) {
            const btnEditId = `btnedit${item.id}`;
            const btnDeleteId = `btndelete${item.id}`;
            const tableRow = `
            <tr Id='${item.id}'   data-CustomerID='${item.id}'   data-name='${item.name}' data-age='${item.age}'  data-status='${item.status}'>
                 <td class='td-data'>${item.id}</td>
                 <td class='td-data'>${item.name}</td>
                 <td class='td-data'>${item.age}</td>
                 <td class='td-data'>${item.status}</td>
                 <td class='td-data'> 
                        <button id='${btnEditId}' class='btn btn-info btn-xs btn-editcustomer' onclick='showEditRow(${item.id})'><i class='fa fa-pencil' aria-hidden='true'> </i> Edit </button>
                        <button id='${btnDeleteId}' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRow(${item.id})'> <i class='fa fa-trash' aria-hidden='true'> </i> Delete </button>
                </td>
                   
            </tr>`;
            document.querySelector('#tblbody').innerHTML += tableRow;
        })
    }
    const AddRow = `
        <tr>
            <td class='td-data'></td>
            <td class='td-data'><input type='text' id='txtname' placeholder='name..'></td>
            <td class='td-data'><input type='number' id='textage' placeholder='age..'></td>
            <td class='td-data'><select id='ddlstatus'><option value='active'>active</option><option value='inactive'>inactive</option></select></td>
            <td class='td-data'><button id= 'btnaddCustomer' onclick='addUser()' class='btn btn-success'> <i class='fa fa-plus-circle' aria-hidden='true'></i>Add</button> </td>
        </tr>`;
    document.querySelector('#tblbody').innerHTML += AddRow;
}

function GetUserID() {
    const ID = Date.now();
    return ID;
}

function addUser() {
    const userId = GetUserID();
    const txtname = document.querySelector("#txtname").value;
    if (!txtname) {
        alert('Please enter name!')
        return false;
    }
    const age = document.querySelector("#textage").value;
    if (!age) {
        alert('Please enter age!')
        return false;
    }

    const status = document.getElementById("ddlstatus").value;
    const userObj = {
        "id": userId,
        "name": txtname,
        "age": age,
        "status": status
    };
    addUserDataToLocalStorage(userObj);
    document.querySelector('#txtname').value = "";
    document.querySelector('#textage').value = "";
    bindUserData();
};

function showEditRow(UserID) {
    const userRow = document.getElementById(UserID); //this gives tr of  whose button was clicked
    const trdata = userRow.querySelectorAll(".td-data");
    /*returns array of all elements with
    "row-data" class within the row with given id*/
    const userID = trdata[0].innerHTML;
    const userName = trdata[1].innerHTML;
    const userAge = trdata[2].innerHTML;
    const userStatus = trdata[3].innerHTML;

    trdata[0].innerHTML = `<input name="txtuserid"  disabled id="txtuserid" value="${userID}"/>`;
    trdata[1].innerHTML = `<input name="txtname" id="txtname" value="${userName}"/>`;
    trdata[2].innerHTML = `<input type='number' name="txtage" id="txtage" value="${userAge}"/>`;
    if (userStatus == 'active') {
        trdata[3].innerHTML = `<select id="ddlstatus"><option value="active">active</option><option value="inactive">inactive</option></select>`;
    }
    else {
        trdata[3].innerHTML = `<select id="ddlstatus"><option value="inactive">inactive</option><option value="active">active</option></select>`;
    }

    trdata[4].innerHTML =
        `<button class='btn btn-primary btn-xs btn-updateCustomer' onclick='updateUser(${userID})'> 
         <i class='fa fa-pencil' aria-hidden='true'></i>Update</button>
         <button class='btn btn-warning btn-xs btn-cancelupdate' onclick='cancel(${userID})'><i class='fa fa-times' aria-hidden='true'></i>Cancel</button>
         <button class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteUser(${userID})'>
         <i class='fa fa-trash' aria-hidden='true'></i>Delete</button>`;
}
function cancel(UserID) {
    const btneditId = `btnedit${UserID}`;
    const btndeleteId = `btndelete${UserID}`;

    const CustomerRow = document.getElementById(UserID); //this gives tr of  whose button was clicked
    const data = CustomerRow.querySelectorAll(".td-data");

    const name = CustomerRow.getAttribute("data-name");
    const age = CustomerRow.getAttribute("data-age");
    const status = CustomerRow.getAttribute("data-status");

    data[0].innerHTML = UserID;
    data[1].innerHTML = name;
    data[2].innerHTML = age;

    data[3].innerHTML = status;
    const actionbtn = `
            <button id='${btneditId}' class='btn btn-info btn-xs btn-editcustomer' onclick='showEditRow("${UserID}")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>
            <button id='${btndeleteId}' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRow("${UserID}")'><i class='fa fa-trash' aria-hidden='true'>Delete</button>`;
    data[4].innerHTML = actionbtn;
}
function updateUser(UserID) {
    const userRow = document.getElementById(UserID); //this gives tr of  whose button was clicked
    const data = userRow.querySelectorAll(".td-data");
    const name = data[1].querySelector("#txtname").value;
    const age = data[2].querySelector("#txtage").value;
    const status = data[3].querySelector("#ddlstatus").value;
    const userObj = {
        "id": UserID,
        "name": name,
        "age": age,
        "status": status
    };
    updateDataToLocalStorage(userObj);
    bindUserData();
}
function deleteRow(UserID) {
    deletedataFromLocalStorage(UserID);
    bindUserData();
}

bindUserData();