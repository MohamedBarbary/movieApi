const Movie = require('./../models/movieModel');
exports.getAllMovies = async (req, res, next) => {
  let { limit = 10, page = 1, category, qe } = req.query;
  const limitRecord = parseInt(limit);
  const skip = (page - 1) * limitRecord;
  let query = {};
  if (category) query.category = category;
  if (qe) {
    query = { $text: { $search: qe } };
  }
  try {
    const movies = await Movie.find(query).limit(limitRecord).skip(skip);
    res.status(200).json({
      status: 'success',
      length: movies.length,
      movies,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};
exports.getSingleMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      movie,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};
exports.insertMovie = async (req, res, next) => {
  const newMovie = new Movie({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
  });

  try {
    await newMovie.save();
    res.status(404).json({
      status: 'data inserted',
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.updateMovie = async (req, res, next) => {
  if (req.body.name) newName = req.body.name;
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { name: newName },
      { new: true }
    );
    res.status(200).json({
      status: 'indeed',
      movie,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};
exports.deleteMovie = async (req, res, next) => {
  try {
    const data = await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'indeed',
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};
