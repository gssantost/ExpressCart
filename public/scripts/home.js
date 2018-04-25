window.onload = () => {

    if ($('sessionLink').innerHTML === 'Log Out') {
        fetch('../../purchase/items', { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.data.length; i++) {
                    let a = document.createElement('a');
                    a.className = 'collection-item';
                    a.innerHTML = data.data[i].product_name;
                    $('cartProducts').appendChild(a);
                }
            })
    }

    fetch('../../show/mostrar', { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' })
        .then(res => res.json())
        .then(data => {
            console.log(data);
                for (let i = 0; i < data.data.length; i++) {
                    let product = new Product(data.data[i]);
                    $('product-board').appendChild(product.col);
            }
        })
}

class Product {
    constructor(props) {
        this.col = document.createElement('div');
        this.col.className = 'col';
        this.card = document.createElement('div');
        this.card.className = 'card';
        this.card.style = `border-radius: 5px;margin: 8px 8px; width: 270px;background-color: beige;`;
        this.content = document.createElement('div');
        this.input = document.createElement('input');
        this.addBtn = document.createElement('button');

        let span = document.createElement('span');
        let pDes = document.createElement('p');
        let pPrice = document.createElement('p');
        let img = document.createElement('img');
        
        this.input = document.createElement('input');
        span.classList.add('card-title', 'center');
        span.innerHTML = props.product_name;
        pDes.classList.add('grey-text', 'center');
        pPrice.classList.add('grey-text', 'center');
        img.src = '../images/agregar.png';
        img.className = 'add';
        pDes.innerHTML = props.product_des;
        pPrice.innerHTML = `Precio: $${props.product_price}`;
        this.input.type = 'hidden';
        this.input.value = props.id_product;
        this.addBtn.className = 'this';

        this.addBtn.onclick = (e) => {
            let options = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }, 
                credentials: 'same-origin',
                body: JSON.stringify({
                    productId: parseInt(this.input.value)
                })
            }
            e.preventDefault();
            fetch(`../../purchase/add`, options)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }
        this.content.appendChild(span);
        this.content.appendChild(pDes);
        this.content.appendChild(pPrice);
        this.content.appendChild(this.input);
        this.addBtn.appendChild(img);
        this.content.appendChild(this.addBtn);
        this.card.appendChild(this.content);
        this.col.appendChild(this.card);
    }
}