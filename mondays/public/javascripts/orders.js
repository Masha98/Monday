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
        dishes: getSelectValues(formValues["menu"])
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
    xhr.open('POST', '/api/orders/all-sum', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        name: formValues["name"].value,
        surname: formValues["surname"].value,
        last_name: formValues["last_name"].value,
        phone: formValues["phone"].value,
        address: formValues["address"].value,
        dishes: getSelectValues(formValues["menu"])
    }));

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            const { total } = JSON.parse(xhr.responseText)
            alert(`Замовлення коштує ${total}грн`);
        }
    };
});

document.getElementById('sumAll').addEventListener('click', function (event) {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/all-orders', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            alert(`Сума всіх замовлень ${xhr.responseText}грн`);
        }
    };
});

document.getElementById('zvitStrav').addEventListener('click', function (event) {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/period-of-dishes', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            const response = JSON.parse(xhr.responseText)
                .map(({ title, count }) => `${title} кількість: ${count}`)
                .join('\n');
            alert(response);
        }
    };
});

document.getElementById('exportOfDishes').addEventListener('click', function (event) {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    const date_lt = new Date(document.getElementById('date_lt').value).toISOString();
    const date_gt = new Date(document.getElementById('date_gt').value).toISOString();
    xhr.open('GET', `/period-of-dishes?date_lt=${date_lt}&date_gt=${date_gt}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            const response = JSON.parse(xhr.responseText)
                .map(({ title, count }) => `${title} кількість: ${count}`)
                .join('\n');
            alert(response);
        }
    };
});

document.getElementById('date').addEventListener('click', function (event) {
    event.preventDefault();
    const date_lt = new Date(document.getElementById('date_lt').value).toISOString();
    const date_gt = new Date(document.getElementById('date_gt').value).toISOString();
    window.open(`/export-db/?date_gt=${date_gt}&date_lt=${date_lt}`);
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