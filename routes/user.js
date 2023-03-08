const { register, login, updateUser } = require('../controller/user');

const router = require('express').Router();


router.post('/register', register);
router.post('/login', login);
router.patch('/update', updateUser);

module.exports = router;