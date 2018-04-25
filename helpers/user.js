const db = require('./db');
const query = require('./queries');
const bcrypt = require('bcryptjs');

module.exports.getUserData = (username) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            //REALIZO QUERY QUE ME RETORNARÁ TODA LA INFORMACIÓN DEL USUARIO
            obj.one(query['selectAllByUsername'], username).then((data) => {
                res(data);
                //console.log(data);
                obj.done();
            }).catch((error) => {
                console.log(error);
                rej(error);
                obj.done();
            })
        }).catch((error) => {
            console.log(error);
            rej(error);
        })
    });
}

//RECIBO POR PARÁMETRO EL PASSWORD ENVIADO DESDE LA APP Y EL PASSWORD COMO HASH DESDE LA DB PARA COMPARAR
module.exports.comparePassword = (candidatePassword, passwordHash) => {
    return new Promise((res, rej) => {
        bcrypt.compare(candidatePassword, passwordHash, (error, isMatch) => {
            if (error) throw rej(error);
            res(isMatch);
        })
    });
}