let query = [
    'SELECT name, lastname, username, balance FROM public.app_user WHERE username = $1',
    'INSERT INTO public.app_user (name, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING name'
]
module.exports = query;