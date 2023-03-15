const { register, login, updateUser, changePassword, createNewAdmin, getAllUser, revokeUserAccess } = require('../controller/user');

const router = require('express').Router();


router.post('/register', register);
router.post('/login', login);
router.patch('/update', updateUser);
router.patch('/change-password', changePassword);

// other admin
router.post('/create-a-new-admin', createNewAdmin);
router.patch('/revoke-access/:id', revokeUserAccess);

router.get('/', getAllUser);

module.exports = router;