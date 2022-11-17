const mongoose = require('mongoose');

const Venta = mongoose.model('Venta',
  new mongoose.Schema({ idvend: Number, zona: String, fecha: String, valorventa: Number })
);

const Vendedor = mongoose.model('Vendedor',
  new mongoose.Schema({ idvend: Number, nombre: String, correoe: String, totalcomision: Number })
);

module.exports = {
  Venta: Venta,
  Vendedor: Vendedor
}

// Otra forma más corta:
// module.exports = {
//     Cliente,
//     Articulo
// }
