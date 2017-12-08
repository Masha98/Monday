document.getElementById('order').addEventListener('click', function (event) {
    event.preventDefault();
    const formValues = document.getElementById('form').elements;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/orders', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(getSelectValues(formValues["menu"]));
    xhr.send(JSON.stringify({
        name: formValues["name"].value,
        surname: formValues["surname"].value,
        last_name: formValues["last_name"].value,
        phone: formValues["phone"].value,
        address: formValues["address"].value,
        menu: getSelectValues(formValues["menu"])
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

document.getElementById('count').addEventListener('click', function (event) {
    event.preventDefault();
    const formValues = document.getElementById('form').elements;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/count-order', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ menu: getSelectValues(formValues["menu"] )}));

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            console.log(xhr.responseText);
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