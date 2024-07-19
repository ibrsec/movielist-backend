const CustomError = require('../config/customError');
const {User} = require('../models/userModel');
const mongoose = require('mongoose');


module.exports.userController = {

    /**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: 
 *       - Users
 *     security:
 *       - Session Cookie: []
 *     responses:
 *       '200':
 *         description: Successful - All users are listed!
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
 *                   example: All users are listed!
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
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
 *                   example: Internal server error
 */

    list: async(req,res)=> {
        const users = await User.find();

        res.status(200).json({
            error:false,
            message:"All users are listed!",
            result:users
        })


    },



    /**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User successfully created
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
 *                   example: New user is created!
 *                 result:
 *                   $ref: '#/components/schemas/User'
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
 *                   example: All fields are mandatory, username, email, password!
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
 *                   example: Internal server error
 */

    create: async(req,res)=> {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            throw new CustomError('All fields are mandatory, username,email,password!',400);
        }

        const newUser = await User.create(req.body);

        res.status(201).json({
            error:false,
            message : 'New user is created!',
            result:newUser,
        })


    },



    /**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to fetch
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful - User is retrieved
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
 *                   example: Your user is here!
 *                 result:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request - Invalid ID type
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
 *                   example: Invalid id type!
 *       '404':
 *         description: User not found
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
 *                   example: User not found!
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
 *                   example: Internal server error
 */

    read: async(req,res)=> {
       if(! mongoose.Types.ObjectId.isValid(req.params.id)){
        throw new CustomError('Invalid id type!',400);
       }

        const user = await User.findOne({_id:req.params.id})
        if(!user){
            throw new CustomError('User not found!',404)
        }

        res.status(200).json({
            error:false,
            message:"Your user is here!",
            result:user,
        })



    },



 /**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: User successfully deleted
 *       '400':
 *         description: Bad request - Invalid ID type
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
 *                   example: Invalid id type!
 *       '404':
 *         description: User not found
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
 *                   example: User not Found!
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
 *                   example: Something went wrong! Issue at last step! or Deleted user still exists! Something went wrong!
 */

    delete: async(req,res)=> {
        if(! mongoose.Types.ObjectId.isValid(req.params.id)){
            throw new CustomError('Invalid id type!',400);
           }

           const user = await User.findOne({_id:req.params.id})
           if(!user){
            throw new CustomError("User not Found!",404)
           }

           const {deletedCount} = await User.deleteOne({_id:req.params.id});
           if(!deletedCount){
            throw new CustomError("Something went wrong! Issue at last step!",500);
           }
           const deletedUser = await User.findOne({_id:req.params.id})
           if(deletedUser){
            throw new CustomError("Deleted user still exists! Something went wrong!",500);
           }

           res.sendStatus(204);




    },
}