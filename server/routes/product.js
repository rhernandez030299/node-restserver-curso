const express = require('express');
const _ = require('underscore');
const bodyParser = require('body-parser');
const Product = require('./../models/product');
const { verificaToken } = require('./../middlewares/autenticacion');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.get('/product/find/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Product.find({ name: regex })
        .populate('category', 'description')
        .exec((err, productDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                product: productDB
            })
        })
})

app.get('/product', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Product.find({ available: true })
        .skip(desde)
        .limit(5)
        .populate('user', 'email nombre')
        .populate('category', 'description')
        .exec((err, productDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                product: productDB
            });

        });
});

app.get('/product/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Product.findById(id)
        .populate('category user')
        .exec((err, productDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                product: productDB
            });

        });
});


app.post('/product', verificaToken, (req, res) => {

    let body = req.body;
    body = _.pick(body, ['name', 'priceUni', 'description', 'available', 'category']);

    let product = new Product({
        name: body.name,
        priceUni: body.priceUni,
        description: body.description,
        available: body.available,
        category: body.category,
        user: req.usuario._id
    });

    product.save((err, productDB) => {

        if (err) {
            return require.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            product: productDB
        });
    });
});

app.put('/product/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let body = req.body;
    body = _.pick(body, ['name', 'priceUni', 'description', 'available', 'category']);

    Product.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productDB) => {

        if (err) {
            return require.status(500).json({
                ok: false,
                err
            });
        }
        return res.json({
            ok: true,
            product: productDB
        });

    });
});

app.delete('/product/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Product.findByIdAndRemove(id, (err, productDB) => {

        if (err) {
            return require.status(500).json({
                ok: false,
                err
            });
        }
        return res.json({
            ok: true,
            product: productDB
        });

    });
});

module.exports = app;