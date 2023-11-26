const express = require('express');
const router = express.Router();
const movieController = require('./../controller/movieController');
router
  .route('/movies')
  .get(movieController.getAllMovies)
  .put(movieController.insertMovie);
router
  .route('/movies/:id')
  .get(movieController.getSingleMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);
module.exports = router;
