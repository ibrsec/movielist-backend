const { userController } = require('../controllers/userController');
const authentication = require('../middlewares/sessionAtuhentication');

const router = require('express').Router();


router.route('/')
.get(authentication,userController.list)
.post(userController.create);

router.route('/:id')
.get(authentication,userController.read)
.delete(authentication,userController.delete);


module.exports = router;
