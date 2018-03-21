const express = require('express');
const router = express.Router();
const {linkApprove, approveLink} = require('../controllers/ctrlAdmin')
const {isAdmin} = require('../controllers/ctrlAuth')

router.get('/linkApprove', isAdmin, linkApprove)
router.get('/accept/:id/:bot',isAdmin , approveLink )

module.exports = router;