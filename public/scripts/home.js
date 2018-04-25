window.onload = () => {

    fetch('../../show/mostrar', { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' })
        .then(res => res.json())
        .then(data => {
            console.log(data);
                for (let i = 0; i < data.data.length; i++) {
                    let product = new Product(data.data[i]);
                    $('product-board').appendChild(product.col);
                /*$('product-board').innerHTML +=
                `<div class="col">
                    <div class="card" style="border-radius: 5px;margin: 8px 8px; width: 270px;background-color: beige;">
                        <div class="card-content">
                            <span class="card-title center">${data.data[i].product_name}</span>
                            <p class="grey-text center">${data.data[i].product_des}</p>
                            <p class="grey-text center">precio: ${data.data[i].product_price}$</p>
                            <input type="text" type="hidden" value="${data.data[i].id_product}/>
                            <button id="add-button" class="this" onclick="add()"><img src="../images/agregar.png" class="add"></button>
                        </div>
                    </div>
                </div>`*/;
            }
        })
}

function add(){
    
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
            e.preventDefault();
            /*fetch(`../../products/by/${props.id_product}`, { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    $('updateName').value = props.product_name;
                    $('updateDescrip').value = props.product_des;
                    $('updatePrice').value = props.product_price;
                    $('updateStock').value = props.product_stock;
                    $('productId').value = props.id_product;
                })

            modalUpdate.open();*/
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