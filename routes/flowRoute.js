const express = require('express');
const router = express.Router();
const flowController = require('../controllers/flowController');
const Authentication=require('../middlwares/jwtMiddleware')

router.post('/flow/save',Authentication, flowController.addFlow);
router.get('/flow/load',Authentication, flowController.getFlow);

module.exports = router;