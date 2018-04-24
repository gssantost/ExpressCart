let queries = {
    'selectByUsername': 'SELECT * FROM public.app_user WHERE username = $1',
    'insertAppUser': 'INSERT INTO public.app_user (name, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING name',
    'insertProduct': 'INSERT INTO public.product (product_name, product_des, product_stock, product_price, product_url, id_user) VALUES ($1, $2, $3, $4, $5, $6)',
    'readProducts': 'SELECT * FROM public.product WHERE id_user = $1',
    'deleteProduct': 'DELETE FROM public.product WHERE id_product = $1 AND id_user = $2',
    'updateProductPrice': 'UPDATE public.product SET product_price = $1 WHERE id_product = $2',
    'updateProductStock': 'UPDATE public.product SET product_stock = $1 WHERE id_product = $2',
    'updateProductDes': 'UPDATE public.product SET product_des = $1 WHERE id_product = $2',
    'updateProductName': 'UPDATE public.product SET product_name = $1 WHERE id_product = $2'
}
module.exports = queries;