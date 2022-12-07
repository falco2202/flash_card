import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";

import UserRoute from "./src/routes/user.route.js"
import DeckRoute from "./src/routes/deck.route.js"

dotenv.config();
mongoose.connect('mongodb://localhost:27017/api_start')
        .then(() => console.log('Connect database successful'))
        .catch((err) => console.log(err))

const app = express();
const port = process.env.PORT || 3333;

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// route
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: "Oke"
  })
})

// Routes
app.use('/users', UserRoute)
app.use('/decks', DeckRoute)

// Error handle function
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  return res.status(status).json({
    error: {
      message: error.message
    }
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});