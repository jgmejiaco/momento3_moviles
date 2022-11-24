const mongoose = require('mongoose');

const Venta = mongoose.model('Venta',
  new mongoose.Schema({ idventa: String, zona: String, fecha: String, valorventa: Number })
);

const Vendedor = mongoose.model('Vendedor',
  new mongoose.Schema({ idvend: String, nombre: String, nombre: String, totalcomision: Number })
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
