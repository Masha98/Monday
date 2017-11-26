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
        password: formValues["pass"].value
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

