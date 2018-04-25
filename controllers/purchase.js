const express = require('express');
const db = require('../helpers/db');
const query = require('../helpers/queries');
let router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);
    db.tx(t => {
        return t.batch([
            t.any(query['insertCartItem'], [req.body.productId, req.user.cart]),
            t.one(query['updateCartTotal'], req.user.cart),
            t.many(query['selectCartItems'], req.user.cart)
        ]);
    }).then(data => {
        console.log(data)
        res.send({ status: 200, data: data});
    }).catch(error => {
        console.log(error);
        res.send({ error: error, msg: 'Not Created', status: 500 });
    })
})

router.get('/items', (req, res) => {
    db.connect().then(obj => {
        obj.many(query['selectCartItems'], req.user.cart).then(data => {
            res.send({ status: 200, data: data });
            obj.done();
        }).catch((err) => {
            console.log(err);
            res.send({ status: 500, error: err, msg: 'ERROR' });
            obj.done();
        })
    }).catch((err) => {
        console.log(err);
        res.send({
            error: err,
            msg: 'not Created',
            status: 500,
            url: '/views/home/'
        });
    })
})
module.exports = router;