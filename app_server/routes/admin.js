const express = require('express');
const router = express.Router();
const {linkApprove, approveLink, rejectLink} = require('../controllers/ctrlAdmin')
const {isAdmin, isLoggedIn} = require('../controllers/ctrlAuth')

router.get('/linkApprove', isLoggedIn, isAdmin, linkApprove)
router.get('/accept/:id/:bot', isLoggedIn, isAdmin , approveLink )
router.get('/reject/:id/:bot', isLoggedIn, isAdmin , rejectLink )

module.exports = router;