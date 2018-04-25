window.onload = () => {

    fetch('../../show/mostrar', { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' })
        .then(res => res.json())
        .then(data => {
            console.log(data);
                for (let i = 0; i < data.data.length; i++) {
                $('product-board').innerHTML +=
                `<div class="col">
                                    <div class="card" style="border-radius: 5px;margin: 8px 8px; width: 270px;background-color: beige;">
                                        <div class="card-content">
                                            <span class="card-title center">${data.data[i].product_name}</span>
                                            <p class="grey-text center">${data.data[i].product_des}</p>
                                            <p class="grey-text center">precio: ${data.data[i].product_price}$</p>
                                            
                                            <button id="add-button" class="this" onclick="add()"><img src="../images/agregar.png" class="add"></button>
 
                                    </div>
                                </div>`
            }
        })
}

function add(){
    
}