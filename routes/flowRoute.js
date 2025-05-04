const express = require('express');
const router = express.Router();
const flowController = require('../controllers/flowController');
const Authentication=require('../middlwares/jwtMiddleware')

//adding and updating flow
router.post('/flow/save',Authentication, flowController.addFlow);
//fetching flow
router.get('/flow/load',Authentication, flowController.getFlow);

module.exports = router;