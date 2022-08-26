const express = require("express");
const router = express.Router();
const home_Controller = require("../controllers/home_controller");
module.exports = router;

router.get("/", home_Controller.home);
