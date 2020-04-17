const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//hasMany() -> Tem muitos 1 para N, Uma categoria possui varios artigos
Category.hasMany(Article);
//Um artigo peretence a uma categoria -> um relacionamento 1 para 1 ->belongsTo()
Article.belongsTo(Category);

//Article.sync({ force: true });


module.exports = Article;