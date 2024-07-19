const { authController } = require('../controllers/authController.js');
const authentication = require('../middlewares/sessionAtuhentication.js');

const router = require('express').Router();


router.post("/login",authController.login);
router.all("/logout",authentication,authController.logout);



module.exports = router;
