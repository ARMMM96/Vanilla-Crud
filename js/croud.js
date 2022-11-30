const addUserDataToLocalStorage = (userObj) => {

    //already has data in localstorage then update it other create new one
    var users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        users.push(userObj);
        localStorage.setItem('userData', JSON.stringify(users));
    }
    else {
        var userData = new Array();
        userData.push(userObj);
        localStorage.setItem('userData', JSON.stringify(userData));

    }
}
const updateDataToLocalStorage = (userObj) => {

    const users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        const user = users.filter((x) => x.id == userObj.id).pop();
        if (user != null) {
            user.name = userObj.name;
            user.age = userObj.age;
            user.status = userObj.status;
        }
        localStorage.setItem('userData', JSON.stringify(users));
    }
}

const deletedataFromLocalStorage = (UserId) => {

    const users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        users.splice(users.findIndex(a => a.id === UserId), 1)
        localStorage.setItem('userData', JSON.stringify(users));
    }
}