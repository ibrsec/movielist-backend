const CustomError = require('../config/customError');
const {Movie} = require('../models/moviesModel');
const mongoose = require('mongoose');


module.exports.moviesController = {

    /**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: 
 *       - Movies
 *     security:
 *       - Session Cookie: []
 *     responses:
 *       '200':
 *         description: Successful - All movies are listed!
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
 *                   example: All movies are listed!
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
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
        const movies = await Movie.find();

        res.status(200).json({
            error:false,
            message:"All movies are listed!",
            result:movies
        })


    },



/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags:
 *       - Movies
 *     security:
 *       - Session Cookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieTitle:
 *                 type: string
 *                 example: "Inception"
 *               year:
 *                 type: integer
 *                 example: 2010
 *               image:
 *                 type: string
 *                 example: "http://example.com/inception.jpg"
 *     responses:
 *       '201':
 *         description: New movie is created!
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
 *                   example: New movie is created!
 *                 result:
 *                   $ref: '#/components/schemas/Movie'
 *       '400':
 *         description: Bad request, All fields are mandatory, movieTitle, year, image!
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
 *                   example: All fields are mandatory, movieTitle, year, image!
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
        const {movieTitle,year,image} = req.body;
        if(!movieTitle || !year || !image){
            throw new CustomError('All fields are mandatory: movieTitle, year, image!',400);
        }

        const newMovie = await Movie.create(req.body);

        res.status(201).json({
            error:false,
            message : 'New movie is created!',
            result:newMovie,
        })


    },

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags:
 *       - Movies
 *     security:
 *       - Session Cookie: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1e8c5a4c8e4d2a"
 *         description: The ID of the movie to retrieve
 *     responses:
 *       '200':
 *         description: Your movie is here!
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
 *                   example: Your movie is here!
 *                 result:
 *                   $ref: '#/components/schemas/Movie'
 *       '400':
 *         description: Invalid id type!
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
 *         description: Movie not found!
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
 *                   example: Movie not found!
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

        const movie = await Movie.findOne({_id:req.params.id})
        if(!movie){
            throw new CustomError('Movie not found!',404)
        }

        res.status(200).json({
            error:false,
            message:"Your movie is here!",
            result:movie,
        })



    },

    /**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     tags:
 *       - Movies
 *     security:
 *       - Session Cookie: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1e8c5a4c8e4d2a"
 *         description: The ID of the movie to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieTitle:
 *                 type: string
 *                 example: "Inception"
 *               year:
 *                 type: integer
 *                 example: 2010
 *               image:
 *                 type: string
 *                 example: "http://example.com/inception.jpg"
 *             required:
 *               - movieTitle
 *               - year
 *               - image
 *     responses:
 *       '202':
 *         description: Selected movie is updated!
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
 *                   example: Selected movie is updated!
 *                 result:
 *                   $ref: '#/components/schemas/Movie'
 *       '400':
 *         description: Bad request - All fields are mandatory, movieTitle, year, image!
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
 *                   example: All fields are mandatory, movieTitle, year, image!
 *       '404':
 *         description: Movie not found!
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
 *                   example: Movie not found!
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
 *                   example: Something went wrong! Issue at last step!
 */

    update: async(req,res)=> {
        if(! mongoose.Types.ObjectId.isValid(req.params.id)){
            throw new CustomError('Invalid id type!',400);
           }

     const {movieTitle,year,image} = req.body;
        if(!movieTitle || !year || !image){
            throw new CustomError('All fields are mandatory: movieTitle, year, image!',400);
        }


            const movie = await Movie.findOne({_id:req.params.id})
            if(!movie){
                throw new CustomError('Movie not found!',404)
            }


            const isUpdated = await Movie.updateOne({_id:req.params.id},req.body)

            if(!isUpdated?.modifiedCount){
                throw new CustomError("Something went wront! Issue at last step!", 500);
            }
            const updatedMovie = await Movie.findOne({_id:req.params.id})
            if(!updatedMovie){
                throw new CustomError('Updated Movie not found!',500)
            }

            res.status(202).json({
                error:false,
                message:"Selected movie is updated!",
                result: updatedMovie
            })
    },

/**
 * @swagger
 * /movies/{id}:
 *   patch:
 *     summary: Partially update a movie by ID
 *     tags:
 *       - Movies
 *     security:
 *       - Session Cookie: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1e8c5a4c8e4d2a"
 *         description: The ID of the movie to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieTitle:
 *                 type: string
 *                 example: "Inception"
 *               year:
 *                 type: integer
 *                 example: 2010
 *               image:
 *                 type: string
 *                 example: "http://example.com/inception.jpg"
 *             additionalProperties: false
 *     responses:
 *       '202':
 *         description: Selected movie is updated!
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
 *                   example: Selected movie is updated!
 *                 result:
 *                   $ref: '#/components/schemas/Movie'
 *       '400':
 *         description: Bad request - At least one field should be provided, movieTitle, year, image!
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
 *                   example: On patch method, at least one field should be provided, movieTitle, year, image!
 *       '404':
 *         description: Movie not found!
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
 *                   example: Movie not found!
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
 *                   example: Something went wrong! Issue at last step!
 */

    patchUpdate: async(req,res)=>  {
        if(! mongoose.Types.ObjectId.isValid(req.params.id)){
            throw new CustomError('Invalid id type!',400);
           }

     const {movieTitle,year,image} = req.body;
        if(!(movieTitle || year || image)){
            throw new CustomError('On patch method, at least one field should be provided: movieTitle, year, image!',400);
        }


            const movie = await Movie.findOne({_id:req.params.id})
            if(!movie){
                throw new CustomError('Movie not found!',404)
            }


            const isUpdated = await Movie.updateOne({_id:req.params.id},req.body)

            if(!isUpdated?.modifiedCount){
                throw new CustomError("Something went wrong! Issue at last step!", 500);
            }
            const updatedMovie = await Movie.findOne({_id:req.params.id})
            if(!updatedMovie){
                throw new CustomError('Updated Movie not found!',500)
            }

            res.status(202).json({
                error:false,
                message:"Selected movie is updated!",
                result: updatedMovie
            })
    },


/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags:
 *       - Movies
 *     security:
 *       - Session Cookie: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1e8c5a4c8e4d2a"
 *         description: The ID of the movie to delete
 *     responses:
 *       '204':
 *         description: Movie successfully deleted
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
 *         description: Movie not found
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
 *                   example: Movie not found!
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
 *                   example: Something went wrong! Issue at last step!
 */

    delete: async(req,res)=> {
        if(! mongoose.Types.ObjectId.isValid(req.params.id)){
            throw new CustomError('Invalid id type!',400);
           }

           const movie = await Movie.findOne({_id:req.params.id})
           if(!movie){
            throw new CustomError("Movie not Found!",404)
           }

           const {deletedCount} = await Movie.deleteOne({_id:req.params.id});
           if(!deletedCount){
            throw new CustomError("Something went wrong! Issue at last step!",500);
           }
           const deletedMovie = await Movie.findOne({_id:req.params.id})
           if(deletedMovie){
            throw new CustomError("Deleted movie still exists! Something went wrong!",500);
           }

           res.sendStatus(204);




    },
}