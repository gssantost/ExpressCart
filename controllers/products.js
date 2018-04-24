const express = require('express');
const os = require('os');
const multer = require('multer');
const db = require('../helpers/db');
const query = require('../helpers/queries');
const path = require('../middlewares/path');
//Multer Config
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${os.homedir()}\\ShoppingCartUploads\\${req.user.username}`);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})
let upload = multer({storage: storage});
let router = express.Router();
//Create
router.post('/create', path.checkRoot, path.checkUploadPath, upload.single('file'), (req, res) => {
    let stock = parseInt(req.body.stock);
    let price = parseFloat(req.body.price);
    let fileUrl = `${os.homedir()}\\ShoppingCartUploads\\${req.user.username}\\${req.file.originalname}`;
    db.connect().then(obj => {
        obj.any(query['insertProduct'], [req.body.name, req.body.description, stock, price, fileUrl, req.user.id]).then(data => {
            console.log(data);
            res.send({status: 200, response: 'Producto agregado'});
            obj.done();
        }).catch(error => {
            console.log(error);
            res.send({ error: error, msg: 'Not Created', status: 500 });
            obj.done();
        })
    }).catch(error => {
        console.log(error);
        res.send({
            status: 500,
            msg: 'not Created',
            error: error
        })
    })
});
//Read
router.get('/show', (req, res) => {
    db.connect().then(obj => {
        obj.many(query['readProducts'], req.user.id).then(data => {
            //console.log(data);
            res.send({status: 200, data: data});
            obj.done();
        }).catch((err) => {
            console.log(err);
            res.send({status: 500, error: err, msg: 'Invalid select'});
            obj.done();
        })
    }).catch((err) => {
        console.log(err);
        res.send({
            error: err,
            msg: 'not Created',
            status: 500
        });
    })
});
//Delete
router.get('/remove/:id', (req, res) => {
    db.connect().then(obj => {
        obj.any(query['deleteProduct'], [req.params.id, req.user.id]).then(data => {
            console.log(data);
            res.send({status: 200, response: 'OK. Product deleted'});
            obj.done();
        }).catch((err) => {
            console.log(err);
            res.send({status:500, error: err, msg: 'Not deleted'});
            obj.done();
        })
    }).catch((err) => {
        console.log(err);
        res.send({
            error: err,
            msg: 'not Created',
            status: 500
        })
    })
});
module.exports = router;