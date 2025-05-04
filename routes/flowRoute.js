const express = require('express');
const router = express.Router();
const flowController = require('../controllers/flowController');
const Authentication=require('../middlwares/jwtMiddleware')

//adding and updating flow

/**
 * @swagger
 * /flow/save:
 *   post:
 *     summary: Save or update a user's flowchart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nodes:
 *                 type: array
 *                 items:
 *                   type: object
 *               edges:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Flow saved or updated successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/flow/save',Authentication, flowController.addFlow);
//fetching flow

/**
 * @swagger
 * /flow/load:
 *   get:
 *     summary: Load the logged-in user's saved flowchart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Flow loaded successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/flow/load',Authentication, flowController.getFlow);

module.exports = router;