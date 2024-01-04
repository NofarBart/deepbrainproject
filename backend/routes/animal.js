const express = require('express');
const router = express.Router();
const {enterAnimal} = require("../controllers/animal")

router.post('/enterAnimal', enterAnimal)

module.exports = router;