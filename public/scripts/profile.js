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
                let item = new ListItem(data.data[i]);
                $('userProducts').appendChild(item.item);
            }
        })
        .catch(err => {
            console.log({response: 'No posee productos', error: err});
        })
    var collapsibleElem = document.querySelectorAll('.collapsible');
    var collapsibleInstance = M.Collapsible.init(collapsibleElem);
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

class ListItem {
    constructor(props) {
        this.item = document.createElement('li');
        this.updateBtn = document.createElement('button');
        this.removeBtn = document.createElement('button');
        var modalUpdate = M.Modal.init(modal[1]);
        let div = document.createElement('div');
        let itemImg = document.createElement('img');
        let divTitle = document.createElement('div');
        let divCollapse = document.createElement('div');
        itemImg.classList.add('circle', 'responsive-img');
        divTitle.classList.add('collapsible-header');
        divTitle.innerHTML = `
            <span><strong>${props.product_name}</strong></span>
            <span style="margin-left: 4rem;"><strong>${props.product_price}$</strong></span>
            <span style="margin-left: 4rem;">${new Date(props.created_at).toLocaleDateString()}</span>
        `;
        divCollapse.classList.add('collapsible-body');
        divCollapse.innerHTML = `<p><strong>Descripción:</strong> ${props.product_des}<span style="margin-left: 4rem;">Cantidad: ${props.product_stock}</span></p>`;
        this.updateBtn.classList.add('btn', 'btn-flat', 'waves-effect', 'waves-light');
        this.updateBtn.innerHTML = 'Editar';
        this.removeBtn.classList.add('btn', 'btn-flat', 'waves-effect', 'waves-red');
        this.removeBtn.innerHTML = 'Eliminar';
        this.updateBtn.onclick = (e) => {
            e.preventDefault();
            fetch(`../../products/by/${props.id_product}`, { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    $('updateName').value = props.product_name;
                    $('updateDescrip').value = props.product_des;
                    $('updatePrice').value = props.product_price;
                    $('updateStock').value = props.product_stock;
                    $('productId').value = props.id_product;
                })

            modalUpdate.open();
        }
        this.removeBtn.remove.onclick = (e) => {
            e.preventDefault();
            fetch(`../../products/remove/${data.data[i].id_product}`, { credentials: 'same-origin' })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    location.href = '/views/users';
                })
        }
        div.appendChild(this.updateBtn);
        div.appendChild(this.removeBtn);
        divCollapse.appendChild(div);
        this.item.appendChild(itemImg);
        this.item.appendChild(divTitle);
        this.item.appendChild(divCollapse);
        $('userProducts').appendChild(this.item);
    }
}


function update() {
    let config = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin', 
        body: JSON.stringify({
            name: $('updateName').value,
            description: $('updateDescrip').value,
            price: $('updatePrice').value,
            stock: $('updateStock').value,
            id: $('productId').value
        })
    }
    fetch(`../../products/update`, config)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            //location.href = '/views/users';
        })
    var modalUpdate = M.Modal.init(modal[1]);
    modalUpdate.close();
    $('productId').value = '';
    $('updateName').value = '';
    $('updateDescrip').value = '';
    $('updatePrice').value = '';
    $('updateStock').value = '';
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
