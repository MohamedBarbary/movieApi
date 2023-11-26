const movieRoute = require('./routes/movieRoute');
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
app.use(cors());
app.use(express.json());
app.use('/api/v1', movieRoute);
mongoose
  .connect(
    process.env.ATLAS_DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('connect is okay'))
  .catch((err) => console.log('error : ', err.message));
app.listen(process.env.PORT, () => {
  console.log('you are in port 4000');
});
