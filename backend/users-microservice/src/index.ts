// equivalent of older: const express = require('express')
import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.routes';
import * as db from './db';
import { globalErrorHandler } from './middleware/globalErrorHandler'

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

db.connect();
// API root
app.use('/user', userRoutes);
app.use(globalErrorHandler)

// A default hello word route
const port: string = process.env.PORT || '8100';

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
