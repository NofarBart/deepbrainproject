const express = require('express');
const router = express.Router();
const {createParadigm} = require("../controllers/paradigm")

router.post('/paradigm/create', createParadigm)

module.exports = router;