const { User } = require("../models/userModel");
const passwordEncrypter = require("../helpers/passwordEncrypter");
const CustomError = require("../config/customError");

module.exports.authController = {


  /**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Provide just one of the username or email fields. 
 *     tags: 
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: Password1!
 *             required:
 *               - password
 *               - username
 *               - email
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Login successful!"
 *                 result:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: The ID of the user.
 *                       example: "60d5f4852f5e1c001c8b4567"
 *                     username:
 *                       type: string
 *                       description: The username of the user.
 *                       example: john_doe
 *       '400':
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Email or username and a password fields are required!"
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Unauthorized! - User not Found! or Unauthorized! - Invalid password!
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

  login: async (req, res) => {
    const { username, email, password } = req.body;

    if (!password || !(email || username)) {
      throw new CustomError(
        "Email or username and a Password fields are required!"
      );
    }
    let user = null;
    if (username) {
      // login with username
      user = await User.findOne({ username });
    } else if (email) {
      // login with email
      user = await User.findOne({ email });
    }

    if (!user) {
      throw new CustomError("Unauthorized! - User not Found!", 401);
    }

    if (user.password !== passwordEncrypter(password)) {
      throw new CustomError("Unauthorized! - Invalid password!", 401);
    }

    //LOGIN :OK

    //session cookies setting =>
    req.session.user_id = user._id;
    req.session.password = user.password;



    //response=>
    res.status(200).json({
      error: false,
      message: "Loginned Successfully!",
      result: {
        user_id: user._id,
        username: user.username,
      },
    });
  },


/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     tags:
 *       - Auth
 *     responses:
 *       '200':
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Logout is successful!"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

  logout: async (req, res) => {
    req.session = null;
    res.status(200).json({
        error:false,
        message:"Logout is successfull!"
    })
  },
};
