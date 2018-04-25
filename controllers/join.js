const express = require('express');
const db = require('../helpers/db');
const query = require('../helpers/queries');
const encrypter = require('../helpers/encrypter');
let router = express.Router();

router.post('/create', (req, res) => {
    db.task(t => {
        let hashedPass = encrypter.passwordAsHash(req.body.password);
        return t.one(query['insertAppUser'], [req.body.name, req.body.lastname, req.body.username, req.body.email, hashedPass]).then(user => {
            return t.one(query['insertCart'], user.id_user);
        })
    }).then(data => {
        console.log(data);
        res.send({ data: data, status: 200 });
    }).catch(error => {
        console.log(error);
        res.send({ error: error, msg: 'Not Created', status: 500 });
    })
    /*db.connect().then(obj => {
        let hashedPass = encrypter.passwordAsHash(req.body.password);
        obj.one(query['insertAppUser'], [req.body.name, req.body.lastname, req.body.username, req.body.email, hashedPass]).then(data => {
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
    })*/
})

module.exports = router;