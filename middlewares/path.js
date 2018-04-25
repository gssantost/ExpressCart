const fs = require('fs');
const os = require('os');
const root = `${os.homedir()}/ShoppingCartUploads`;
//const root = `/public/uploads`;

module.exports.checkRoot = (req, res, next) => {
    fs.exists(root, (exists) => {
        if (exists) {
            next();
        } else {
            fs.mkdir(root, (err) => {
                if (err) {
                    console.log(err);
                    next();
                }
                next();
            })
        }
    })
};

module.exports.checkUploadPath = (req, res, next) => {
    let path = `${root}/${req.user.username}`;
    fs.exists(path, (exists) => {
        if (exists) {
            next();
        } else {
            fs.mkdir(path, (err) => {
                if (err) {
                    console.log(err);
                    next();
                }
                next();
            })
        }
    })
};