const express = require('express');
const router = express.Router();
const refreshTokenController = require('../../controllers/public/refreshTokenController');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;