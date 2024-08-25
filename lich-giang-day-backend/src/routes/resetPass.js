const express = require('express');
const router = express.Router();
const { requestReset, verifyCode, updatePassword } = require('../controllers/resetPassController');

router.post('/request-reset', requestReset);
router.post('/verify-code', verifyCode);
router.post('/update-password', updatePassword);

module.exports = router;
