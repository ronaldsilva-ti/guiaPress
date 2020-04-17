const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");



router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

//Create
router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories");
        });
    } else {
        res.redirect("/admin/categories/new");
    }
});

//Read
router.get("/admin/categories", (req, res) => {

    Category.findAll().then(categories => {
        res.render("admin/categories/index", { categories: categories });
    });

});

//Delete
router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {

            Category.destroy({
                where: {
                    id: id
                }

            }).then(() => {
                res.redirect("/admin/categories");
            });

        } else { //se nao for numero
            res.redirect("/admin/categories");
        }

    } else { //NULL
        res.redirect("/admin/categories");
    }

});


//EDIÇÂO
router.get("/admin/categories/edit/:id", (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) { //verificar se n for um nº
        res.redirect("/admin/categories");
    }
    Category.findByPk(id).then(category => {
        if (category != undefined) {
            res.render("admin/categories/edit", { category: category });
        } else {
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
        res.redirect("/admin/categories");
    })
});


//ATUALIZAR
router.post("/categories/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({ title: title, slug: slugify(title) }, { //Atualizar o titulo pelo ID
        where: {
            id: id
        }

    }).then(() => {
        res.redirect("/admin/categories");

    })


});








module.exports = router;