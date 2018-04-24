window.onload = () => {

    fetch('../../show/mostrar', { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' })
        .then(res => res.json())
        .then(data => {
            console.log(data);
                for (let i = 0; i < data.data.length; i++) {
                $('product-board').innerHTML +=
                `<div class="col">
                                    <div class="card" style="margin: 10px 10px; width: 300px;">
                                        <div class="card-content">
                                            <span class="card-title">${data.product_name}</span>
                                            <p class="grey-text">${data.product_des}</p>
                                            <p class="grey-text">${data.product_price}</p>
                                        </div>
                                    </div>
                                </div>`
            }
        })
}