// equivalent of older: const express = require('express')
import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from './routes/users.routes';
import balloonRoutes from './routes/balloons.routes';
dotenv.config({ path: './environment.env' });

const app = express();

// Handle POST requests that come in formatted as JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// API root
app.use('/api/user', userRouter);
app.use('/api/balloon', balloonRoutes);


// A default hello word route
const port: string = process.env.PORT || '8000';

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
