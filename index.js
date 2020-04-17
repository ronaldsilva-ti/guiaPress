const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

// View Engine
app.set('view engine', 'ejs');

//Funcionar arquivos estaticos
app.use(express.static('public'));

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão Realizada com Sucesso");
    }).catch((error) => {
        console.log(error);
    });

app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then((articles) => {
        Category.findAll().then(categories => {
            res.render("index", { articles: articles, categories: categories });
        });
    })

});


//Pesquisar pelo SLUG
app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", { article: article, categories: categories });
            });

        } else {
            res.redirect("/");
        }

    }).catch(error => {
        res.redirect("/");
    });

});


app.get('/categories/:slug', (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{
                model: Article,
                include: [{ model: Category }],
            }] //Serve como um join para ligar category e article
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render('index', { articles: category.articles, categories: categories });
            });
        } else {
            res.redirect('/');
        }
    }).catch(error => {
        console.log('Ocorreu um erro: ' + error)
        res.redirect('/');
    });
})






//Rodar Servidor
app.listen(4040, () => {
    console.log("O servidor esta rodando");

});