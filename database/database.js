const Sequelize = require("sequelize");

//nome do banco,usuario,senha
const connection = new Sequelize('guiaPress', 'root', '33363452', {
    host: 'localhost', //servidor
    dialect: 'mysql', //tipo de banco de dados
    timezone: "-03:00"
});



module.exports = connection;