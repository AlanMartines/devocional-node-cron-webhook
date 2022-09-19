
const express = require("express");
const router = express.Router();
//
// ------------------------------------------------------------------------------------------------//
//
router.get('/clients',clients.findAll);
router.get('/clients/:id',clients.findClient);
router.put('/clients/:id',clients.updateClient);
router.delete('/clients/:id',clients.deleteClient);
router.post('/clients', clients.addClient);
//
// ------------------------------------------------------------------------------------------------//
//
module.exports = router;