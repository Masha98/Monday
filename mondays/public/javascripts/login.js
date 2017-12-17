document.getElementById('login').addEventListener('click', function (event) {
    event.preventDefault();
    var formValues = document.getElementById('form_log').elements;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/users', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        name: formValues["name"].value,
        surname: formValues["surname"].value,
        login: formValues["log"].value,
        password: formValues["pass"].value,
        type: getSelectValues(formValues["types"])[0]
    }));

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            alert(log.value + ",ви успішно зареєстровані!");
            console.log(xhr.responseText);
            document.getElementById('form_log').reset()
        }
    };
});

document.getElementById('signOut').addEventListener('click', function (event) {
    event.preventDefault();
    var formValues = document.getElementById('form_avtor').elements;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/sign', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        login: formValues["log"].value,
        password: formValues["pass"].value
    }));

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            alert(log.value + ",ви успішно aвторизовані!");
            console.log(xhr.responseText);
            document.getElementById('form_log').reset()
        }
    };
});

function getSelectValues(select) {
    let result = [];
    let options = select && select.options;
    let opt;

    for (let i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];
        if (opt.selected) {
            result.push(opt.value);
        }
    }
    return result;
}
