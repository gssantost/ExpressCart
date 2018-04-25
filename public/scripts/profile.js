var modal = document.querySelectorAll('.modal');
var modalInstance = M.Modal.init(modal);

window.onload = () => {
    fetch('../../session/value', { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.status === 200) {
                $('profileName').innerHTML = data.session.user.username;
            } else if (data.status === 400) {
                location.href = '/views';
            }
        })
    fetch('../../products/show', { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < data.data.length; i++) {
                let item = document.createElement('a');
                let update = document.createElement('a');
                let remove = document.createElement('a');
                item.classList.add('collection-item');
                item.innerHTML = data.data[i].product_name;
                update.classList.add('btn', 'waves-effect', 'waves-light', 'blue');
                update.innerHTML = 'Modificar';
                remove.classList.add('btn', 'waves-effect', 'waves-light', 'orange');
                remove.innerHTML = 'Eliminar';
                remove.href = `../../products/remove/${data.data[i].id_product}`;
                item.appendChild(update);
                item.appendChild(remove);
                $('userProducts').appendChild(item);
            }
        })
}

function upload() {
    let fd = new FormData();
    fd.append('file', $('file').files[0], $('file').files[0].name);
    fd.append('name', $('name').value.trim());
    fd.append('description', $('descrip').value.trim());
    fd.append('stock', $('stock').value);
    fd.append('price', $('price').value);
    fetch('../../products/create', { credentials: 'same-origin', method: 'post', body: fd })
        .then(res => res.json())
        .then(data => console.log(data));
}

const logout = () => {
    fetch(`../../session/logout`, { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.url) {
                location.href = data.url;
            }
        });
}

const home =() => {
    fetch(`../../show/mostrar`, { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.url) {
                location.href = data.url;
            }
        });


}
$('home-button').addEventListener("click", home);
$('logout-button').addEventListener('click', logout);