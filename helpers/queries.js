let queries = {
    'selectByUsername': 'SELECT * FROM public.app_user WHERE username = $1',
    'insertAppUser': 'INSERT INTO public.app_user (name, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id_user',
    'insertCart': 'INSERT INTO public.cart (id_user, cart_total, cart_status) VALUES ($1, 0, false) RETURNING id_cart',
    'insertProduct': 'INSERT INTO public.product (product_name, product_des, product_stock, product_price, product_url, id_user) VALUES ($1, $2, $3, $4, $5, $6)',
    'readProducts': 'SELECT * FROM public.product WHERE id_user = $1',
    'deleteProduct': 'DELETE FROM public.product WHERE id_product = $1 AND id_user = $2',
    'updateProduct': 'UPDATE public.product SET product_name = $1, product_des = $2, product_price = $3, product_stock = $4 WHERE id_product = $5',
    'updateProductStock': 'UPDATE public.product SET product_stock = $1 WHERE id_product = $2',
    'selectProductById': 'SELECT product_name, product_des, product_price, product_stock FROM public.product WHERE id_product = $1',
    'updateProductDes': 'UPDATE public.product SET product_des = $1 WHERE id_product = $2',
    'updateProductName': 'UPDATE public.product SET product_name = $1 WHERE id_product = $2',
    'showProducts': 'SELECT product_name, product_des, product_price, id_product FROM public.product',
    'selectAllByUsername': 'SELECT a.id_user, name, lastname, username, password, email, id_cart FROM public.app_user a INNER JOIN public.cart c ON a.id_user = c.id_user WHERE a.username = $1',
    'insertCartItem': 'INSERT INTO public.cart_item (id_product, id_cart, item_quantity) VALUES ($1, $2, 1)',
    'updateCartTotal': `UPDATE public.cart SET cart_total = (SELECT SUM(item_quantity*product_price) 
                        FROM public.cart_item c, public.product p WHERE c.id_product = p.id_product AND id_cart = $1) WHERE id_cart = $2 
                        RETURNING cart_total`,
    'selectCartItems': 'SELECT product_name FROM public.product p INNER JOIN public.cart_item c ON p.id_product = c.id_product WHERE id_cart = $1'
}
module.exports = queries;