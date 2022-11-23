const cors       = require('cors')
const express    = require("express");
const controller = require("./controllers.js");

const router = express.Router();

// --------------- API REST CRUD

router.get    ("/vendedor",      cors(), controller.readVendedor);   // Read All
router.get    ("/vendedor/:id",  cors(), controller.readVendedor);    // Read
router.delete ("/vendedor/:id",  cors(), controller.deleteVendedor);  // Delete
router.put    ("/vendedor/:id",  cors(), controller.updateVendedor);  // Update
router.post   ("/vendedor",      cors(), controller.createVendedor);  // Create

router.get    ("/venta",     cors(), controller.readVenta);  // Read All
router.get    ("/venta/:id", cors(), controller.readVenta);   // Read
router.delete ("/venta/:id", cors(), controller.deleteVenta); // Delete
router.put    ("/venta/:id", cors(), controller.updateVenta); // Update
router.post   ("/venta",     cors(), controller.createVenta); // Create

module.exports = router;
