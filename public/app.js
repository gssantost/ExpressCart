const selectUser = () => {
    if ($('username').value.trim() !== '') {
        fetch(`../db/getUser/${$('username').value.trim()}`).then(res => res.json()).then(data => console.log(data));
    } else {
        console.log('Wrong value');
    }
}

const registerUser = () => {
    if (($('name').value && $('lastname').value && $('user').value && $('email').value && $('pass').value) !== '') {
        let configs = {
            headers: {'Content-Type':'application/json' },
            method: 'post',
            body: JSON.stringify({
                name: $('name').value.trim(),
                lastname: $('lastname').value.trim(),
                username: $('user').value.trim(),
                email: $('email').value.trim(),
                password: $('pass').value.trim()
            })
        }
        fetch(`../db/createUser`, configs).then(res => res.json()).then(data => console.log(data));
    } else {
        console.log('Check empty fields');
    }
}

const handleLogin = (e) => {
    e.preventDefault();
    selectUser();
}

const handleRegistry = (e) => {
    e.preventDefault();
    registerUser();
}

$('register-button').addEventListener('click', handleRegistry);
$('login-button').addEventListener('click', handleLogin);