const express = require('express');
const router = express.Router();
const {enterParadigm} = require("../controllers/paradigm")

router.post('/enterParadigm', enterParadigm)

module.exports = router;