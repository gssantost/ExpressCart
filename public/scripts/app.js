const login = () => {
    let configs = {
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            username: $('username').value.trim(),
            password: $('password').value.trim()
        }),
        credentials: 'same-origin'
    }
    if (($('username').value.trim() && $('password').value.trim()) !== '') {
        fetch(`../session/login`, configs)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                if (data.url) {
                    location.href = data.url;
                }
            });
    } else {
        M.toast({html: '¡Campos vacíos!', classes: 'cyan'})
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
        fetch(`../join/create`, configs).then(res => res.json()).then(data => console.log(data));
    } else {
        M.toast({html: '¡Campos vacíos!', classes: 'cyan'});
    }
}

const handleLogin = (e) => {
    e.preventDefault();
    login();
}

const handleRegistry = (e) => {
    e.preventDefault();
    registerUser();
}

$('register-button').addEventListener('click', handleRegistry);
$('login-button').addEventListener('click', handleLogin);