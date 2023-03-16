const { register, login, updateUser, changePassword, createNewAdmin, getAllUser, revokeUserAccess,getUser } = require('../controller/user');

const router = require('express').Router();


router.post('/register', register);
router.post('/login', login);
router.patch('/update', updateUser);
router.patch('/change-password', changePassword);

// other admin
router.post('/create-a-new-admin', createNewAdmin);
router.patch('/revoke-access/:id', revokeUserAccess);

router.get('/:id', getUser);
router.get('/', getAllUser);

module.exports = router;