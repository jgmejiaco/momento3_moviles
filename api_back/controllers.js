const { Vendedor, Venta } = require("./models.js");

// ------- VENDEDOR

exports.readVendedor = (req, res) =>
    Vendedor.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

exports.readVendedor = (req, res) =>
    Vendedor.findOne({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

exports.deleteVendedor = (req, res) =>
    Vendedor.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

exports.updateVendedor = (req, res) =>
    Vendedor.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { idvend: req.body.idvend, nombre: req.body.nombre, correoe: req.body.correoe, totalcomision: req.body.totalcomision } },
        (err, data) => {
            if (err) res.json({ error: err });
            else     res.json(data);
        }
    );

exports.createVendedor = (req, res) =>
    new Vendedor({ idvend: req.body.idvend, nombre: req.body.nombre, correoe: req.body.correoe, totalcomision: req.body.totalcomision })
    .save((err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

// ------ VENTA

exports.readVenta = (req, res) =>
    Venta.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

exports.readVenta = (req, res) =>
    Venta.findOne({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

exports.deleteVenta = (req, res) =>
    Venta.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

exports.updateVenta = (req, res) =>
    Venta.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { idventa: req.body.idventa, zona: req.body.zona, fecha: req.body.fecha, valorventa: req.body.valorventa } }, 
        (err, data) => {
            if (err) res.json({ error: err });
            else     res.json(data);
        }
    );

exports.createVenta = (req, res) =>
    new Venta({ idventa: req.body.idventa, zona: req.body.zona, fecha: req.body.fecha, valorventa: req.body.valorventa })
    .save((err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });