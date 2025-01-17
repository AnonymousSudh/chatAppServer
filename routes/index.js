const express = require("express")
const router= express.Router();
const apirouter = require("./v1/index")
router.use('/v1',apirouter);

module.exports = router