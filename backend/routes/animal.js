const express = require('express');
const router = express.Router();
const {createAnimal, displayAnimal} = require("../controllers/animal")

router.post('/animal/create', createAnimal);
router.get('/animals/all', displayAnimal);

module.exports = router;