const router = require("express").Router();
const { moviesController } = require("../controllers/moviesController");

router.route("/").get(moviesController.list).post(moviesController.create);

router
  .route("/:id")
  .get(moviesController.read)
  .put(moviesController.update)
  .patch(moviesController.patchUpdate)
  .delete(moviesController.delete);

module.exports = router;
