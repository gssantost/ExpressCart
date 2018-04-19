const express = require('express');
let db = require('../helpers/db');
let query = require('../helpers/queries');
let route = express.Router();
//SELECT
route.get('/getUser/:param', (req, res) => {
    db.connect().then((obj) => {
        obj.one(query[0], [req.params.param])
        .then((data) => {
            console.log(data);
            res.send({data: data, status: 200});
            obj.done();
        }).catch((err) => {
            console.log(err);
            res.send({
                error: err,
                msg: 'No Record Found',
                status: 500
            });
            obj.done();
        })
    }).catch((error) => {
        console.log(error);
        res.send({
            error: error,
            msg: 'not Created',
            status: 500
        });
    })
})
//INSERT
route.post('/createUser', (req, res) => {
    db.connect().then(obj => {
        obj.one(query[1], [req.body.name, req.body.lastname, req.body.username, req.body.email, req.body.password]).then(data => {
            console.log(data);
            res.send({data: data, status: 200});
            obj.done();
        }).catch(error => {
            console.log(error);
            res.send({error: error, msg: 'Not Created', status: 500});
            obj.done();
        })
    }).catch((error) => {
        console.log(error);
        res.send({
            error: error,
            msg: 'not Created',
            status: 500
        });
    })
})
module.exports = route;