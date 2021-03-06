const express = require('express');
const db = require('../helpers/db');
const query = require('../helpers/queries');
let router = express.Router();

router.get('/mostrar', (req, res) => {
    db.connect().then(obj => {
        obj.many(query['showProducts']).then(data => {
            //console.log(data);
            res.send({status: 200, data: data, url: '/views/home/'});
            obj.done();
        }).catch((err) => {
            console.log(err);
            res.send({status: 500, error: err, msg: 'ERROR'});
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
});
module.exports = router;