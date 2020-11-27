async function errorHandler(err, req, res, next) {
  switch (err.name) {
    case 'ValidationError':
      console.error(err);
      res.status(400).send('Validation error');
      break;
    case 'CastError':
      console.error(err);
      res.status(400).send('Validation error');
      break;
    case 'MulterError':
      console.error(err);
      res.status(400).send('Image too large');
      break;
    default:
      console.error(err);
      res.sendStatus(err.status || 500);
      break;
  }
}

module.exports = {
  errorHandler,
};
