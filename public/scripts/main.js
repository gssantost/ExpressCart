const $ = (id) => document.getElementById(id);

var tabs = M.Tabs.init($('tabs'));
var elem = document.querySelector('.sidenav');
var instance = M.Sidenav.init(elem, options);
var options = {};
options.edge = "right";

fetch('../../session/value', { credentials: 'same-origin', headers: { 'Content-Type': 'application/json' } })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.status !== 200) {
            $('profileLink').innerHTML = '';
            $('profileLink').href = '';
            $('sessionLink').removeAttribute('onclick');
            $('sessionLink').innerHTML = 'Sing Up';
            $('sessionLink').href = '/views/';
        } else {
            $('profileLink').innerHTML = `${data.session.user.username}`;
            $('profileLink').href = '/views/users/';
            $('sessionLink').innerHTML = 'Log Out';
            $('sessionLink').addEventListener('click', logout);
        }
    })

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
