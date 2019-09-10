const express = require('express');
const Category = require('./../models/category');
const { verificaToken } = require('./../middlewares/autenticacion');
const app = express();
const _ = require('underscore');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/categories', verificaToken, (req, res) => {

    Category.find({})
        .populate('user', 'nombre email')
        .sort('description')
        .exec((err, categoryDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                category: categoryDB
            });
        })
});

app.post('/categories', verificaToken, (req, res) => {

    let body = req.body;
    body = _.pick(body, ['description']);

    let category = new Category({
        description: body.description,
        user: req.usuario._id
    });

    category.save((err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            category: categoryDB
        });
    });
});

app.get('/categories/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Category.findById(id, (err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'La categoria no existe'
                }
            });
        }

        return res.json({
            ok: true,
            category: categoryDB
        });
    });
});

app.put('/categories/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, ['description']);

    Category.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            category: categoryDB
        });
    });
});

app.delete('/categories/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Category.findByIdAndRemove(id, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            category: categoryDB
        });
    });
});

module.exports = app;