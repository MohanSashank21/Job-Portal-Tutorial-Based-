const express = require('express');
const {register,login,getMe,uploadFunc} = require("../controllers/authController");
const {protect} = require("../middlewares/authmiddleware");
const upload = require('../middlewares/uploadmiddleware');
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/me",protect,getMe);
router.post("/upload-image",upload.single('image'),uploadFunc);

module.exports = router;