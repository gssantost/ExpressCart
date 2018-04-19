const $ = (id) => document.getElementById(id);

const selectUser = () => {
    if ($('user').value.trim() !== '') {
        fetch(`../db/getUser/${$('user').value.trim()}`).then(res => res.json()).then(data => console.log(data));
    } else {
        console.log('Wrong value');
    }
}

const regitserUser = () => {
    if (($('name').value && $('lastname').value && $('username').value && $('email').value && $('password').value) !== '') {
        let configs = {
            headers: {'Content-Type':'application/json' },
            method: 'post',
            body: JSON.stringify({
                name: $('name').value.trim(),
                lastname: $('lastname').value.trim(),
                username: $('username').value.trim(),
                email: $('email').value.trim(),
                password: $('password').value.trim()
            })
        }
        fetch(`../db/createUser`, configs).then(res => res.json()).then(data => console.log(data));
    } else {
        console.log('Check empty fields');
    }
}

$('getBtn').addEventListener('click', selectUser);
$('postBtn').addEventListener('click', regitserUser);