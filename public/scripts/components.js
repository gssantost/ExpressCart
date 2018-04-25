class ListItem {
    constructor(props) {
        this.item = document.createElement('li');
        this.item.classList.add('collection-item');
        this.item.innerHTML = props.product_name;
        let div = document.createElement('div');
        let updateBtn = document.createElement('button');
        let removeBtn = document.createElement('button');
        updateBtn.classList.add('btn', 'btn-flat', 'waves-effect', 'waves-light');
        update.innerHTML = 'mode-edit';
        remove.classList.add('btn', 'btn-flat', 'waves-effect', 'waves-light');
        remove.innerHTML = 'delete-forever';
        remove.href = `../../products/remove/${data.data[i].id_product}`;
        div.appendChild(update);
        div.appendChild(remove);
        item.appendChild(div);
        $('userProducts').appendChild(item);
    }
}