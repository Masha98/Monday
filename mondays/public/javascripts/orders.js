document.getElementById('order').addEventListener('click', function (event) {
    event.preventDefault();
    var formValues = document.getElementById('form').elements;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/orders', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        name: formValues["name"].value,
        surname: formValues["surname"].value,
        last_name: formValues["last_name"].value,
        phone: formValues["phone"].value,
        address: formValues["address"].value,
        menu: formValues["menu"].value
    }));

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            alert("Ваше замовлення успішно відправлено!");
            console.log(xhr.responseText);
            document.getElementById('form').reset()
        }
    };
});