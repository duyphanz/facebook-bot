const express = require('express');
const router = express.Router();
const {linkApprove, approveLink, rejectLink} = require('../controllers/ctrlAdmin')
const {isAdmin} = require('../controllers/ctrlAuth')

router.get('/linkApprove', isAdmin, linkApprove)
router.get('/accept/:id/:bot',isAdmin , approveLink )
router.get('/reject/:id/:bot',isAdmin , rejectLink )

module.exports = router;