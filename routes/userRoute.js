const express=require('express')
const Router=new express.Router()

const userController=require('../controllers/userController')
const simulatorController=require('../controllers/sensorSimulator')
const Authentication=require('../middlwares/jwtMiddleware')

//on register

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user and send OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to email
 *       400:
 *         description: User already exists
 */
Router.post('/register',userController.onRegister)

//onOTP

/**
 * @swagger
 * /register/{otp}:
 *   post:
 *     summary: Verify OTP and complete registration
 *     parameters:
 *       - in: path
 *         name: otp
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User verified and registered
 *       400:
 *         description: Invalid or expired OTP
 */
Router.post('/register/:otp',userController.onVerifyOTP)

//onLogin

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user and get JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */

Router.post('/login',userController.onLogin)

//onFetchProfile 

/**
 * @swagger
 * /fetch/profile:
 *   get:
 *     summary: Fetch logged-in user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       401:
 *         description: Unauthorized
 */
Router.get('/fetch/profile',Authentication,userController.onFetchProfile)



module.exports=Router